#!/bin/bash

# Define a global variable for the container name
CONTAINER_NAME="demo-web-app"

git stash
git pull
chmod 755 *.sh

# Check if container with the specified name exists
if [ $(docker ps -a -f name=$CONTAINER_NAME -q) ]; then
  # Stop and remove the container
  echo "Stopping and removing existing $CONTAINER_NAME container..."
  docker stop $CONTAINER_NAME
  docker rm $CONTAINER_NAME
fi

# Build and run the Docker container
echo "Building and starting a new $CONTAINER_NAME container..."
docker build -t $CONTAINER_NAME .
docker run -e HOST_MACHINE_NAME=$(hostname) --name $CONTAINER_NAME --restart unless-stopped -p 2000:80 -d $CONTAINER_NAME
