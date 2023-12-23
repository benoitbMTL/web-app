# Start from a PHP image with Apache
FROM php:7.4-apache

# Set the working directory to the Apache document root
WORKDIR /var/www/html

# Copy the application source code
COPY . .

# Expose port 3000 for Apache
EXPOSE 3000

# Start Apache server in the foreground
CMD ["apache2-foreground"]
