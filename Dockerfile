FROM node:18-alpine

WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install  --only=production


COPY . .

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "start:prod"]