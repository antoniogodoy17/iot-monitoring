FROM node:15.14.0-alpine3.10

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm run build

ADD ./dist/ .
ADD .env .

EXPOSE 3000

CMD ["node", "server.js"]