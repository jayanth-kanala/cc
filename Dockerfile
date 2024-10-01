# Build stage
FROM node:20-alpine AS build

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application (assuming a build step exists)
RUN pnpm run build

# Production stage
FROM node:20-alpine AS production

# Set the working directory in the container
WORKDIR /app

# Install pnpm globally in the production image
RUN npm install -g pnpm

# Copy only the package.json and pnpm-lock.yaml for production
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies using pnpm
RUN pnpm install --prod

# Copy only the dist folder from the build stage to the production stage
COPY --from=build /app/dist ./dist

# Optionally list the files in the working directory for verification
RUN echo "Files in production stage:" && ls -l

# Command to run the application
CMD ["node", "dist/bin/www.js"]
