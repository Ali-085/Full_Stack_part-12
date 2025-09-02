# Build-only image, no nginx
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# No CMD needed because this is only for build stage
