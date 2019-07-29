#!/bin/sh -e

#nginx setup
envsubst < /etc/nginx/conf.d/react-ssr.template > /etc/nginx/conf.d/default.conf

# start nginx
nginx -g 'daemon off;'
