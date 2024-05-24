from typing import Iterable, List, Literal, Union, override
from pydantic import BaseModel
from anthropic import Anthropic
from anthropic.types import Message as AnthropicMessageResponse


class NotGiven:
    """
    A sentinel singleton class used to distinguish omitted keyword arguments
    from those passed in with the value None (which may have different behavior).

    For example:

    ```py
    def get(timeout: Union[int, NotGiven, None] = NotGiven()) -> Response:
        ...


    get(timeout=1)  # 1s timeout
    get(timeout=None)  # No timeout
    get()  # Default timeout behavior, which may not be statically known at the method definition.
    ```
    """

    def __bool__(self) -> Literal[False]:
        return False

    @override
    def __repr__(self) -> str:
        return "NOT_GIVEN"

NOT_GIVEN = NotGiven()

class MessageParam(BaseModel):
    content: str 
    role: Literal["user", "assistant"]
    

class AnthropicRequestBody(BaseModel):
    max_tokens: int
    messages: Iterable[MessageParam]
    model: Union[
        str,
        Literal[
            "claude-3-opus-20240229",
            "claude-3-sonnet-20240229",
            "claude-3-haiku-20240307",
            "claude-2.1",
            "claude-2.0",
            "claude-instant-1.2",
        ],
    ]
    # stop_sequences: List[str] | NotGiven = NOT_GIVEN
    # stream: Literal[False] | NotGiven = NOT_GIVEN
    # system: str | NotGiven = NOT_GIVEN
    temperature: float = 1.0
    # temperature: float | NotGiven = NOT_GIVEN
    # top_k: int | NotGiven = NOT_GIVEN
    # top_p: float | NotGiven = NOT_GIVEN



