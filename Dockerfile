FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 9009

CMD ["npm", "run", "start:dev"]
