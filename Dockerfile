# Start from the Node.js 14 base image
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Install PHP
RUN apt-get update && \
    apt-get install -y php && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD [ "node", "app.js" ]
