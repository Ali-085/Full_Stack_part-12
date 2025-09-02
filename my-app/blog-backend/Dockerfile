# Use official Node.js LTS image
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Expose port (change if your app uses a different port)
EXPOSE 3001

# Start the application
CMD ["npm", "start"]