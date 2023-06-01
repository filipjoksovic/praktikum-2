FROM node:20-bullseye-slim

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

RUN apt-get update && apt-get install -y netcat

# Bundle app source
COPY . /usr/src/app

# Expose port
EXPOSE 3000

# Build the application
RUN npm run build

# Copy wait-for-it script and give it the necessary permissions
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

# Run the app
ENTRYPOINT ["/usr/src/app/wait-for-it.sh", "mongodb 27018", "--", "node", "/usr/src/app/dist/main.js"]
