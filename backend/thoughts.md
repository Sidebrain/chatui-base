## Phase 1 Backend build

1. User sends `n` messages to the server
2. Server has the following responsibilities:
   (How do I know when to create a new conversation, vs keep the same conversation going?) - Store the messages in a database - Make call to the OpenAI endpoint - Get response, send it to front end - Store the response in the database
