
# backend/Dockerfile
ARG NODE_ENV
FROM node:20

WORKDIR /usr/src/app

# Copy manifests first for caching
COPY package*.json ./

# Install deps (dev deps only in development)
RUN if [ "$NODE_ENV" = "development" ]; then \
	npm ci; \
	else \
	npm ci --omit=dev; \
	fi

# Copy source
COPY . .

# Build only for production
RUN if [ "$NODE_ENV" != "development" ]; then npm run build; fi

EXPOSE 8080

# Dev: nodemon + ts-node/esm; Prod: compiled JS
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev:watch; else npm run start; fi"]

