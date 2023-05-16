# Use Node.js 20
FROM node:20-bullseye-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

RUN apt-get update && apt-get install -y netcat

# Bundle app source
COPY . .

# Expose port
EXPOSE 3000

# Build the application
RUN npm run build

# Copy wait-for-it script and give it the necessary permissions
COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

# Run the app
ENTRYPOINT ["./wait-for-it.sh", "mongodb 27017", "--", "node", "dist/main.js"]
