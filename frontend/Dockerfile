
FROM node:18-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]



