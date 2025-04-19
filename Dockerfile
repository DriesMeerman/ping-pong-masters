# Simplified Dockerfile for Next.js

# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and lock file
# Use package-lock.json for npm, yarn.lock for yarn, pnpm-lock.yaml for pnpm
COPY package.json ./
# Choose the appropriate lock file copy based on your package manager
COPY package-lock.json ./
# COPY yarn.lock ./
# COPY pnpm-lock.yaml ./

# Install app dependencies
# Choose the appropriate install command based on your package manager
RUN npm ci
# RUN yarn install --frozen-lockfile
# RUN yarn global add pnpm && pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]