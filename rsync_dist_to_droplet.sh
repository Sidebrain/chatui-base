#!/bin/zsh

# this sets it so that the script will exit if any command fails
set -e

npm run build --prefix chatui-base/chat-base
rsync -avz \
    --progress \
    chatui-base/chat-base/dist/ root@139.59.28.100:/usr/share/nginx/html \
    --delete
