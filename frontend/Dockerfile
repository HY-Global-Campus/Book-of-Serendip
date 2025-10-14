# frontend/Dockerfile (dev)
FROM node:20-alpine
WORKDIR /usr/src/app

# (Optional, helps some native deps) 
# RUN apk add --no-cache libc6-compat

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 5173
# Bind to all interfaces; keep same port each time
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173", "--strictPort"]

