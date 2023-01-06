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

# Install nodemon for automatically restart the Node.js App
RUN npm install nodemon --global

# Install babel globally
RUN npm install -g babel-cli

# Expose the port on which the app will be running
EXPOSE 8080

# Start the app
CMD ["npm", "run", "dev"]