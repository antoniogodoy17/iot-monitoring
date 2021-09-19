FROM node:15.14.0-alpine3.10

WORKDIR /app

COPY package.json .
COPY tsconfig.json .

RUN npm install
RUN npm install typescript -g

COPY . .

RUN tsc

EXPOSE 5000

CMD ["node", "./dist/server.js"]