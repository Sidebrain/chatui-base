from app import models, schemas
from functionality.openai_types import ChatCompletionType, OpenAIRequest
from .llm_clients import openai_client, anthropic_client
from .anthropic_types import AnthropicMessageResponse, AnthropicRequestBody

import logging

logger = logging.getLogger(__name__)
fh = logging.FileHandler("logs/openai-response.log")
# fh.setLevel(logging.DEBUG)
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
fh.setFormatter(formatter)
logger.addHandler(fh)


def get_chat_response(
    conv_id: int, messages: list[models.Message], llm: schemas.LLM
) -> schemas.MessageCreate:
    match llm.provider:
        case "openai":
            return get_chat_response_from_openai(conv_id, messages, llm)
        case "anthropic":
            return get_chat_response_from_anthropic(conv_id, messages, llm)


def get_chat_response_from_openai(
    conv_id: int, messages: list[models.Message], llm: schemas.LLM
) -> ChatCompletionType:
    """
    Get a response from the OpenAI API
    """
    logger.debug(
        f"Getting response from api for conversation with {len(messages)} messages"
    )
    system_msg = {"role": "system", "content": "You are a helpful assistant"}
    messages = [{"role": msg.role, "content": msg.content} for msg in messages]

    # TODO convert arguments to a pydantic object
    request_body = OpenAIRequest(
        messages=[system_msg] + messages,  # joining system and user messages
        model=llm.model,
        n=1,
        temperature=0.5,
        top_p=1,
    )
    logger.debug(f"Request body to OpenAI:\n{request_body}")
    completion = openai_client.chat.completions.create(**request_body.model_dump())
    logger.debug(f"Response received from OpenAI")
    logger.debug(f"Response from api:\n{completion}")
    # doing this to convert the return type to a pydantic object
    response = ChatCompletionType.model_validate(
        obj=completion,
        from_attributes=True,
    )

    # 2.1 get the cost of the response
    cost = (
        llm.prompt_tokens_cost * response.usage.prompt_tokens
        + llm.completion_tokens_cost * response.usage.completion_tokens
    )
    logger.debug(f"Cost of response: {cost}")
    # 3 Add response to db
    response_msg = schemas.MessageCreate(
        content=response.choices[0].message.content,
        role=response.choices[0].message.role,
        conv_id=conv_id,
        prompt_tokens=response.usage.prompt_tokens,
        completion_tokens=response.usage.completion_tokens,
        cost=cost,
        llm_id=llm.id,
    )
    return response_msg


def get_chat_response_from_anthropic(
    conv_id: int, messages: list[models.Message], llm: schemas.LLM
) -> AnthropicMessageResponse:
    """
    Get a response from the Anthropc API
    """
    logger.debug(
        f"Getting response from api for conversation with {len(messages)} messages"
    )
    # removing system message for anthropic becuase the first message has to come from the user
    messages = [{"role": msg.role, "content": msg.content} for msg in messages]
    request_body = AnthropicRequestBody(
        max_tokens=1024,
        messages=messages,
        model=llm.model,
        temperature=0.5,
    )
    logger.debug(f"Request body to Anthropc:\n{request_body}")
    response = anthropic_client.messages.create(**request_body.model_dump())
    logger.debug(f"Response received from Anthropc", response)
    response = AnthropicMessageResponse.model_validate(
        obj=response,
        from_attributes=True,
    )

    # 2.1 get the cost of the response
    cost = (
        llm.prompt_tokens_cost * response.usage.input_tokens
        + llm.completion_tokens_cost * response.usage.output_tokens
    )
    logger.debug(f"Cost of response: {cost}")
    # 3 Add response to db
    response_msg = schemas.MessageCreate(
        content=response.content[0].text,
        role=response.role,
        conv_id=conv_id,
        prompt_tokens=response.usage.input_tokens,
        completion_tokens=response.usage.output_tokens,
        cost=cost,
        llm_id=llm.id,
    )
    return response_msg
