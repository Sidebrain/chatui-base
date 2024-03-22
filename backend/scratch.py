from functionality.llm_clients import openai_client

messages = [
    {"role": "system", "content": "Hello there, how may I assist you today?"},
    {"role": "user", "content": "Who is the oldest person alive?"},
]
response = openai_client.chat.completions.create(
    messages=messages, model="gpt-3.5-turbo"
)

if __name__ == "__main__":
    print(response)
    print()
