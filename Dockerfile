FROM node:20.18.0

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 5173

CMD npm run dev