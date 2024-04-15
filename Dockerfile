# Start from a base image with Ubuntu
FROM ubuntu:22.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Install Apache, PHP, Node.js, and necessary utilities
RUN apt-get update && apt-get install -y apache2 php libapache2-mod-php php-cli curl vim
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs

# Enable Apache modules for proxy functionality
RUN a2enmod proxy proxy_http rewrite

# Set DirectoryIndex to prefer index.php over other index files
RUN sed -i 's/DirectoryIndex.*$/DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm/' /etc/apache2/mods-enabled/dir.conf

# Copy your PHP project files to the Apache document root
COPY main/ /var/www/html/
WORKDIR /var/www/html

# Set up Node.js project in a separate directory
# Adjust the COPY path to include the 'server/' prefix
COPY server/public/ /var/www/nodeapp/public/
COPY server/server.js /var/www/nodeapp/
COPY server/package.json /var/www/nodeapp/

# Go to the Node.js app directory
WORKDIR /var/www/nodeapp

# Install Node.js dependencies
RUN npm install

# Configure Apache to serve the PHP files from the root and proxy requests to Node.js
RUN echo 'ProxyPass /file http://localhost:9000/file' >> /etc/apache2/sites-available/000-default.conf
RUN echo 'ProxyPassReverse /file http://localhost:9000/file' >> /etc/apache2/sites-available/000-default.conf

# Set working directory back to document root
WORKDIR /var/www/html

# Expose the standard web port
EXPOSE 80

# Create a start script to boot Apache and Node.js
COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
