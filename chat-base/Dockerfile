# Stage 1: Build the react app
FROM node:18

# set the working directory
WORKDIR /app

COPY package.json ./

RUN npm install

# copy system files over
COPY . .

EXPOSE 5179

CMD [ "npm", "run", "dev" ]
# RUN npm run build

# Stage 2: setup nginx to serve the react app