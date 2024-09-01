FROM node:20.15.1-slim

WORKDIR /app

COPY package*.json ./

RUN npm install -g next
RUN npm install

COPY . .

RUN ./node_modules/.bin/next build

EXPOSE 3000

CMD ["npm", "run", "dev"]
