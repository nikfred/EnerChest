FROM node:20.0.0-alpine3.16

WORKDIR /var/enerchest

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "dev" ]
