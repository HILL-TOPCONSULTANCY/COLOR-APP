# Use the official Node.js 16 LTS image
FROM node:16

# Create app directory inside the container
WORKDIR /usr/src/app

# Copy only package.json first to leverage Docker cache for dependencies
COPY package.json package-lock.json* ./

# Install production dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Ensure the logs directory exists
RUN mkdir -p logs

# Allow setting the background color at runtime
ARG COLOR=blue

# Document the port the app will run on
EXPOSE 5050

# Start the app
CMD ["node", "app.js"]
