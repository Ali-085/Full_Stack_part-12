# Development Dockerfile for Vite
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json first (better layer caching)
COPY package*.json ./

# Install all dependencies (including devDependencies for Vite)
RUN npm install


# Copy source code
COPY . .

# Expose Vite’s default port
EXPOSE 5173

# Run the Vite dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
