# Use an official node image
FROM node:lts-alpine

RUN set -xe \
    && apk add --no-cache bash git openssh \
    && git --version && bash --version && ssh -V && npm -v && node -v

ENV HOST 'localhost'
ENV PORT 8900

WORKDIR /opt/react-ssr-api

COPY package.json /opt/react-ssr-api
COPY index.js /opt/react-ssr-api
COPY public/ /opt/react-ssr-api/public
COPY dist/ /opt/react-ssr-api/dist

RUN npm install

EXPOSE 8900

ENV NODE_ENV development

ENTRYPOINT ["node", "."]
