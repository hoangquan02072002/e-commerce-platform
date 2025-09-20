FROM node:20-alpine

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++ curl postgresql-client

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Clean install dependencies
RUN npm ci

# Copy source code and other files (but exclude node_modules)
COPY src ./src
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY .env* ./
COPY .eslintrc.js ./
COPY .prettierrc ./

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

CMD ["npm", "run", "start:dev"]