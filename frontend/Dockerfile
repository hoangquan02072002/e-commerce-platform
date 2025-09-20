FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY next.config.mjs ./
COPY tailwind.config.* ./
COPY postcss.config.* ./
COPY tsconfig.json ./
COPY components.json ./
# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Expose port
EXPOSE 3000

# Start development server (skip build for now)
CMD ["npm", "run", "dev"]