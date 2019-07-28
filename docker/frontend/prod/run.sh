#!/bin/sh -e

# COPY Production build
rm -rf /usr/share/nginx/html/* && cp -R /opt/react-ssr-frontend/* /usr/share/nginx/html

#nginx setup
envsubst < /etc/nginx/conf.d/react-ssr.template > /etc/nginx/conf.d/default.conf

# start nginx
nginx -g 'daemon off;'
