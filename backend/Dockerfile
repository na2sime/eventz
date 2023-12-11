FROM node:20.10.0-alpine

WORKDIR /app

COPY package.json ./

RUN npm config set proxy http://10.31.255.65:8080
RUN npm config set https-proxy http://10.31.255.65:8080
RUN npm install && npm cache clean --force

COPY . .

EXPOSE 4000
CMD [ "npm", "run", "start" ]