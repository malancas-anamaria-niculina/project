# ==== Configuration ====
# Node 16 base image
FROM node:16-alpine
# Set /app as the workdir inside the container
WORKDIR /app
# COPY app files
COPY . .

# ==== Build ====
# Install dependencies using npm ci
RUN npm ci
# Build the app
RUN npm run Build

# ==== Run ====
# Set the environment to development
ENV NODE_ENV development
# Expose the app on which the app will be running
EXPOSE 3000

# Start the app
CMD ["npx", "serve", "build"]