# todo-backend/dev.Dockerfile
FROM node:22

# Set working directory
WORKDIR /usr/src/app

# Install nodemon globally
RUN npm install -g nodemon

# Copy package files first
COPY package*.json ./

RUN npm install

# Copy rest of the backend code
COPY . .

# Default command (overridden in docker-compose)
CMD ["nodemon", "--legacy-watch", "/usr/src/app/bin/www"]
