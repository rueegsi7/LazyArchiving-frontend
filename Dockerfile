# Stage 1: Build with Node.js
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Set build-time environment variables for public env vars
ARG VITE_PUBLIC_AUTH0_CLIENT_ID
ENV VITE_PUBLIC_AUTH0_CLIENT_ID=$VITE_PUBLIC_AUTH0_CLIENT_ID

# Build SvelteKit app
RUN npm run build

# Stage 2: Runtime with Node.js
FROM node:20-alpine

WORKDIR /app

# Copy built app from build stage
COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules

# Expose port 3000
EXPOSE 3000

# Set runtime environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Private environment variables needed at runtime
ARG API_BASE_URL
ARG AUTH0_DOMAIN
ENV API_BASE_URL=$API_BASE_URL
ENV AUTH0_DOMAIN=$AUTH0_DOMAIN

# Run application
CMD ["node", "build"]