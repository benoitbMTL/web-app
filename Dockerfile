# Start from a base image with Ubuntu
FROM ubuntu:20.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Install Apache, PHP, Node.js, and necessary utilities
RUN apt-get update && apt-get install -y \
    apache2 \
    php \
    libapache2-mod-php \
    php-cli \
    curl \
    vim

# Enable Apache modules for proxy functionality
RUN a2enmod proxy proxy_http rewrite

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs

# Copy your PHP project files to the Apache document root
COPY . /var/www/html/
WORKDIR /var/www/html

# Exclude the upload directory from being copied to Apache document root
RUN rm -rf /var/www/html/upload

# Set up Node.js project in a separate directory
COPY upload/ /var/www/nodeapp/
WORKDIR /var/www/nodeapp
RUN npm install

# Configure Apache to serve the PHP files from the root and proxy requests to Node.js
RUN echo 'ProxyPass /upload http://localhost:9000/' >> /etc/apache2/sites-available/000-default.conf
RUN echo 'ProxyPassReverse /upload http://localhost:9000/' >> /etc/apache2/sites-available/000-default.conf

# Set working directory back to document root
WORKDIR /var/www/html

# Expose the standard web port
EXPOSE 80

# Create a start script to boot Apache and Node.js
COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
