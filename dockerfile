FROM node:10.15.3-jessie-slim as build-stage
WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

FROM nginx

COPY --from=build-stage /app/dist/ /usr/share/nginx/html

#docker build -t vue-typescript-demo .
#docker run -d -p 8001:80 vue-typescript-demo