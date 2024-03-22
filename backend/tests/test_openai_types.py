import datetime
from functionality.openai_types import ChatCompletionType


def test_type():
    api_response = {
        "id": "chatcmpl-123",
        "object": "chat.completion",
        "created": 1677652288,
        "model": "gpt-3.5-turbo-0125",
        "system_fingerprint": "fp_44709d6fcb",
        "choices": [
            {
                "index": 0,
                "message": {
                    "role": "assistant",
                    "content": "\n\nHello there, how may I assist you today?",
                },
                "logprobs": None,
                "finish_reason": "stop",
            }
        ],
        "usage": {"prompt_tokens": 9, "completion_tokens": 12, "total_tokens": 21},
    }
    completion_obj = ChatCompletionType.model_validate(api_response)
    assert isinstance(completion_obj, ChatCompletionType)
    assert isinstance(completion_obj.created, datetime.datetime)


def test_live_api():
    from functionality.llm_clients import openai_client

    messages = [
        {"role": "system", "content": "Hello there, how may I assist you today?"},
        {"role": "user", "content": "Who is the oldest person alive?"},
    ]
    response = openai_client.chat.completions.create(
        messages=messages, model="gpt-3.5-turbo"
    )
    completion_pydantic_obj = ChatCompletionType.model_validate(
        response, from_attributes=True
    )
    assert isinstance(completion_pydantic_obj, ChatCompletionType)
    assert isinstance(completion_pydantic_obj.created, datetime.datetime)
    assert bool(completion_pydantic_obj.choices[0].message.content), "response is empty"
