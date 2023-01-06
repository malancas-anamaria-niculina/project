# pull official node image
FROM node:16

# Create app starting directory
WORKDIR /app

# Copy files that contains dependencies that need to be installed
COPY package.json ./
COPY yarn.lock ./

# Install all dependencies from package.json with the exact version from yarn.lock
RUN yarn install

# Bundle app source
COPY . .

# Expose port 3000 
# this is the default port for React app
# if this port is changed, you need to modify "start": "PORT=<port_number> react-scripts start" in package.json
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]