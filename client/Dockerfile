# Base on offical Node.js Alpine image
FROM node:alpine

# Must install GIT (for spritesheet dependency)
RUN apk add --no-cache git

# Set working directory
WORKDIR /usr/app

# Ready to serve static folder
RUN npm install --global serve

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY ./ ./

# Build app
RUN npm run build

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
#USER node

# Run npm start script with PM2 when container starts
CMD [ "npx", "serve", "build", "-s", "--listen", "80" ]