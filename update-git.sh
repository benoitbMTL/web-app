#!/bin/bash

git stash
git pull
chmod 755 *.sh

# Check if container with name my-web-app exists
if [ $(docker ps -a -f name=my-web-app -q) ]; then
  # Stop and remove the container
  echo "Stopping and removing existing my-web-app container..."
  docker stop my-web-app
  docker rm my-web-app
fi

# Build and run the Docker container
echo "Building and starting a new my-web-app container..."
docker build -t my-web-app .
docker run -e HOST_MACHINE_NAME=$(hostname) --name my-web-app --restart unless-stopped -p 3000:80 -d my-web-app

