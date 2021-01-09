# since nginx image is bigger (143 lines), we're starting with it and adding node to it.
# Use an official nginx image
#  from https://github.com/nginxinc/docker-nginx/blob/1d2e2ccae2f6e478f628f4091d8a5c36a122a157/mainline/alpine/Dockerfile
FROM nginx:1.17-alpine


# "FROM node:9.3-alpine"
#   from https://github.com/nodejs/docker-node/blob/a7e88f1dd2102689180f485c51133212f45fa064/9/alpine/Dockerfile
# --

ENV NODE_VERSION 8.11.1
ENV SSH_PRIVATE_KEY ./.ssh/id_rsa
ENV API_DB_HOST "pellefant.db.elephantsql.com"
ENV API_DB_PORT 5432
ENV API_DB_USERNAME "skmsmrzz"
ENV API_DB_PASSWORD "Hsm9XMc1Jlp-_jflt9whZ-1PYdeETNQC"
ENV API_DB_NAME "skmsmrzz"
ENV GIT_PROVIDER github.com
ENV GIT_BRANCH master
ENV GIT_REPO git@github.com:vip-git/react-ssr-advanced-seed.git
ENV CHOKIDAR_USEPOLLING 1

RUN addgroup -g 1000 node \
    && adduser -u 1000 -G node -s /bin/sh -D node \
    && apk add --no-cache \
        libstdc++ \
    && apk add --no-cache --virtual .build-deps \
        binutils-gold \
        curl \
        g++ \
        gcc \
        gnupg \
        libgcc \
        linux-headers \
        make \
        python \
  # gpg keys listed at https://github.com/nodejs/node#release-team
  && for key in \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    56730D5401028683275BD23C23EFEFE93C4CFFFE \
    77984A986EBC2AA786BC0F66B01FBB92821C587A \
  ; do \
    gpg --keyserver pgp.mit.edu --recv-keys "$key" || \
    gpg --keyserver keyserver.pgp.com --recv-keys "$key" || \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key" ; \
  done \
    && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION.tar.xz" \
    && curl -SLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
    && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
    && grep " node-v$NODE_VERSION.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
    && tar -xf "node-v$NODE_VERSION.tar.xz" \
    && cd "node-v$NODE_VERSION" \
    && ./configure \
    && make -j$(getconf _NPROCESSORS_ONLN) \
    && make install \
    && apk del .build-deps \
    && apk add --no-cache bash git openssh \
    && cd .. \
    && rm -Rf "node-v$NODE_VERSION" \
    && rm "node-v$NODE_VERSION.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt

# Installs latest Chromium (64) package.
RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
      chromium@edge \
      nss@edge

# We're not using it's command.
# CMD [ "node" ]

# --
# [end] node:9.3-alpine


# From now on we have both nginx and node (+ git) available

# Create known_hosts
# RUN touch /root/.ssh/known_hosts

# Add gitlab key
# RUN ssh-keyscan gitlab.com >> /root/.ssh/known_hosts

# And we end our Dockerfile with nginx Dockerfile last instructions
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./run.sh /run.sh
RUN ["chmod", "+x", "/run.sh"]

EXPOSE 80
VOLUME /root/.ssh/

STOPSIGNAL SIGTERM

WORKDIR /

CMD /bin/sh ./run.sh
