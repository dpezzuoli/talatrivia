FROM node:21

WORKDIR /usr/src/app

COPY . .

COPY package.json .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
