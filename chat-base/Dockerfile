# Stage 1: Build the react app
FROM node:lts-alpine3.19 as builder

# set the working directory
WORKDIR /app

COPY package*.json ./

RUN npm i

# copy system files over
COPY . .
RUN npm run build