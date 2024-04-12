This is my folder structure with the root being `chatui-base`:

```
├── LICENSE
├── README.md
├── backend
│   ├── Dockerfile
│   ├── app
│   ├── main.py
│   ├── tests
├── chat-base
│   ├── Dockerfile
│   ├── README.md
│   ├── src
│   ├── supabase
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── compose.yml
```

`compose.yml` is my docker compose file and the contents are as follows:

```
services:
    frontend:
        build: /chatui-base/chat-base
        volumes:
            - /chatui-base/chat-base:/chatui-base/chat-base
        ports:
            - "5179:5179"
        depends_on:
            - backend

    backend:
        build: ./backend
        volumes:
            - ./backend:/backend
        ports:
            - "8000:8000"
```

This is the Dockerfile at `chatui-base/backend`

```
FROM python:3.12.2

# set the working directory
WORKDIR /chatui-base/backend

# copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copy the current directory to the working directory
COPY . .

EXPOSE 8008

# command to run the server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

This is the Dockerfile at `chatui-base/chat-base` which is essentially my frontend

```
# Stage 1: Build the react app
FROM node:18

# set the working directory
WORKDIR /chatui-base/chat-base

COPY package*.json ./

RUN npm install

# copy system files over
COPY . .

EXPOSE 5179

CMD [ "npm", "run", "dev" ]
```

Now here's the problem. When i check the files of the running docker container I have two places where the folder structure is creates. Let's take the example of the `backend` part of the code.

Here is the folder structure i find there:

```

├── backend (mounted)
├── chatui-base
    ├── backend
```

There's two folders being created and the one that is being mounted is at the root, sepcifically the tooltip says `Bind mount at /backend`. While the Dockerfile at `chatui-base/backend/Dockerfile` is the old file and no changes are reflected in there.

However the actual dockerfile that is run is the one at `chatui-base/backend`. This is quite confusing and I dont know why there are two directories being created but the one that is being mounted is the old one. Help me figure this out please. Feel free to ask me clarifying questions if needed.
