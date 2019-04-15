FROM node as build-stage
WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

FROM nginx

COPY --from=build-stage /app/dist/ /usr/share/nginx/html

#cd C:\SourceCode\vue-typescript-demo
#docker build -t vue-typescript-demo .
#docker run -d -p 8001:80 vue-typescript-demo