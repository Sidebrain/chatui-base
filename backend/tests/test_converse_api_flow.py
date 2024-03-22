from app.db.session import SessionLocal
import pytest
from app import crud, models, schemas
from functionality.call_llm import get_chat_response_from_openai
from functionality.openai_types import ChatCompletionType, ChoiceType


@pytest.fixture(scope="function")
def db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture(scope="function")
def user_id():
    return 1


@pytest.fixture(scope="function")
def conv_id():
    return 9


def test_presence_of_existing_user(db_session, user_id):

    user = crud.user.get(db_session, user_id)
    assert user is not None
    assert user.id == user_id


def test_absence_of_non_existing_user(db_session):

    user = crud.user.get(db_session, 0)
    assert user is None


def test_add_new_message_with_no_conv_id(db_session, user_id):
    base_input_msg = schemas.MessageBase(
        content="Between king kong and godzilla who is stronger?", role="user"
    )

    empty_conversation = crud.conversation.create_conversation_or_return_empty(
        db_session, user_id
    )
    assert empty_conversation.id is not None, "Conversation id not created"
    assert empty_conversation.owner_id == user_id, "Owner id mismatch"
    assert empty_conversation.messages == [], "Messages not empty"

    create_input_msg = schemas.MessageCreate(
        role=base_input_msg.role,
        content=base_input_msg.content,
        conv_id=empty_conversation.id,
    )

    message: models.Message = crud.message.add_message_to_conversation(
        db=db_session,
        conv_id=empty_conversation.id,
        msg_in=create_input_msg,
    )
    assert empty_conversation.id == message.conv_id, "Conversation id mismatch"
    #! message has no concept of owner, add user_id fk and migrate the tables
    # assert message.user_id == user_id
    assert message is not None, "Message not created"
    assert isinstance(message, models.Message), "Message not of type Message"
    assert (
        message.content == "Between king kong and godzilla who is stronger?"
    ), "Content mismatch"
    assert message.role == "user", "Role mismatch"


# def add_message(db_session, user_id, conv_id, message):
#     assert user_id is not None, "User id not provided"


def test_add_message_with_conv_id(db_session, user_id, conv_id):
    message = schemas.MessageBase(
        role="user",
        content="Between jesus and buddha who has had a greater human impact now and in the future?",
    )
    conv = crud.conversation.get(db_session, conv_id)
    assert conv.owner_id == user_id, "Owner id mismatch"
    assert conv.id == conv_id, "Conversation id mismatch"

    message_create = schemas.MessageCreate(
        role=message.role, content=message.content, conv_id=conv_id
    )
    message = crud.message.add_message_to_conversation(
        conv_id=conv_id, db=db_session, msg_in=message_create
    )
    assert message is not None, "Message not created"
    assert message.content == message_create.content, "Content mismatch"
    assert message.role == message_create.role, "Role mismatch"
    assert message.conv_id == conv_id, "Conversation id mismatch"


def test_get_chat_response_from_openai(db_session, conv_id):

    conversation = crud.conversation.get(db_session, conv_id)
    assert conversation is not None, "Conversation not found"

    messages = conversation.messages
    assert messages is not None, "trying to generate response for empty conversation"

    api_response: ChatCompletionType = get_chat_response_from_openai(messages)
    assert api_response is not None
    assert isinstance(
        api_response, ChatCompletionType
    ), "Response not of custom pydantic openai response type"
    choice: ChoiceType = api_response.choices[0]
    assert choice.message.role == "assistant", "Role mismatch"
    assert (
        choice.message.content is not None
    ), "Content not generated | No content returned from OpenAI"

    # add response message to db
    response_msg = schemas.MessageCreate(
        content=choice.message.content,
        role=choice.message.role,
        conv_id=conv_id,
    )

    msg_db_obj: models.Message = crud.message.add_message_to_conversation(
        db_session, conv_id, response_msg
    )
    assert msg_db_obj is not None
    assert msg_db_obj.content == choice.message.content
    assert msg_db_obj.conv_id == conv_id
