# Node 16 base image
FROM node:16

# Set /app as the workdir inside the container
WORKDIR /app

# Copy files that contains dependencies that need to be installed
COPY package.json ./

# COPY app files
COPY . .

# Install dependencies using npm
RUN npm install

# Expose the port on which the app will be running
EXPOSE 3000

# Start the app
CMD ["npx", "serve", "build"]