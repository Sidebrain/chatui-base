#!/bin/zsh

rsync -avz \
    --progress \
    --exclude-from='chatui-base/.rsync-exclude' \
    --include='backend/.env' \
    --include='chat-base/.env' \
    chatui-base/ root@139.59.28.100:chatui-base \
    --delete
