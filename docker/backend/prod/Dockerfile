# Use an official node image
FROM node:10.16.0-alpine

RUN set -xe \
    && apk add --no-cache bash git openssh \
    && git --version && bash --version && ssh -V && npm -v && node -v

ENV HOST 'localhost'
ENV PORT 3000

WORKDIR /opt/react-ssr-api
COPY dist/ /opt/react-ssr-api/

RUN npm install

EXPOSE 3000

ENV NODE_ENV production

ENTRYPOINT ["node", "server.js"]
