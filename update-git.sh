# bbuonassera June 5th, 2023
# web app demo
# Update Git and Build Docker
#!/bin/bash

git stash
git pull
chmod 755 *.sh

# Check if container with name my-web-app exists
if [ $(sudo docker ps -a -f name=my-web-app -q) ]; then
  # Stop and remove the container
  echo "Stopping and removing existing my-web-app container..."
  sudo docker stop my-web-app
  sudo docker rm my-web-app
fi

# Build and run the Docker container
echo "Building and starting a new my-web-app container..."
sudo docker build -t my-web-app .
sudo docker run --name my-web-app --restart unless-stopped -p 3000:3000 -d my-web-app

