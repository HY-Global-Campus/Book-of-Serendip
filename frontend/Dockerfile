
# Stage 1: Build the React application
FROM node:20-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files into the Docker container
COPY . .

# Build the project for production
RUN npm run build

# Stage 2: Serve the application using serve
FROM node:20-alpine

# Install serve
RUN npm install -g serve

# Copy the build directory from the previous stage
COPY --from=build /app/dist /app

# Serve the application on port 3000
CMD ["serve", "-s", "/app", "-l", "3000"]

# Expose port 3000
EXPOSE 3000


