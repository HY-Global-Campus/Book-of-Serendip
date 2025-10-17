FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then \
	npm ci --include=dev; \
	else \
	npm ci --only=production; \
	fi
RUN npm i -D tsx
COPY . .

EXPOSE 8080

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev:watch; else npx tsx src/index.ts; fi"]



