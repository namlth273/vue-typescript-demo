FROM node:latest

RUN mkdir /usr/front
WORKDIR /usr/front
COPY package.json package-lock.json ./
RUN npm install
ENTRYPOINT npm run serve