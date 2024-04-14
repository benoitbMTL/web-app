#!/bin/bash

# Start Apache in the background
service apache2 start

# Start Node.js application
cd /var/www/nodeapp
node server.js
