#!/bin/sh -e

# COPY Production build
rm -rf /usr/share/nginx/html/* && cp -R /opt/react-ssr-frontend/* /usr/share/nginx/html

#nginx setup
sed -i "s#http://localhost:3010#${API_URL}#" /etc/nginx/conf.d/default.conf

# start nginx
nginx -g 'daemon off;'
