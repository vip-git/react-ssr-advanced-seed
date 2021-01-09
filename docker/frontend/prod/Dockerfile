# since nginx image is bigger (143 lines), we're starting with it and adding node to it.
# Use an official nginx image
#  from https://github.com/nginxinc/docker-nginx/blob/1d2e2ccae2f6e478f628f4091d8a5c36a122a157/mainline/alpine/Dockerfile
FROM nginx:1.17-alpine


# "FROM node:9.3-alpine"
#   from https://github.com/nodejs/docker-node/blob/a7e88f1dd2102689180f485c51133212f45fa064/9/alpine/Dockerfile
# --

ENV NODE_VERSION 8.11.1
ENV API_URL https://react-ssr-nest-api.herokuapp.com
ENV CHOKIDAR_USEPOLLING 1
# And we end our Dockerfile with nginx Dockerfile last instructions
# COPY Production build
RUN rm -rf /usr/share/nginx/html/*
COPY nginx/react-ssr.template /etc/nginx/conf.d/react-ssr.template
COPY build/client/ /usr/share/nginx/html/
COPY ./run.sh /run.sh
# RUN ["chmod", "+x", "/run.sh"]

EXPOSE 80

STOPSIGNAL SIGTERM

WORKDIR /

ENTRYPOINT ["/bin/sh", "./run.sh"]
