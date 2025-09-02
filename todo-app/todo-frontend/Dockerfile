# Stage 1: Install dependencies
FROM node:18 AS deps
WORKDIR /app

COPY package*.json ./
RUN npm install

# Stage 2: Run tests (if tests fail, build stops here ❌)
FROM deps AS test
COPY . .
RUN npm test -- --run

# Stage 3: Build the frontend
FROM deps AS build
COPY . .

ENV VITE_BACKEND_URL="/api"

RUN npm run build

# Debug: list build output
RUN ls -l /app/dist

# Stage 4: Serve the built app using nginx
FROM nginx:alpine

# Copy build output to nginx html directory
# Copy build output to nginx html directory, including all files and folders
COPY --from=build /app/dist/ /usr/share/nginx/html/


CMD ["nginx", "-g", "daemon off;"]
