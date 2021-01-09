# Use an official node image
FROM node:lts-alpine

RUN set -xe \
    && apk add --no-cache bash git openssh \
    && git --version && bash --version && ssh -V && npm -v && node -v

# Environment Variables
ENV HOST 'localhost'
ENV PORT 80
ENV NODE_ENV production

# Database
ENV API_DB_HOST postgres
ENV API_DB_PORT 5433
ENV API_DB_USERNAME postgres
ENV API_DB_PASSWORD postgres
ENV API_DB_NAME postgres
ENV FRONT_END_HOST https://confident-mestorf-ab8ce9.netlify.app

WORKDIR /opt/react-ssr-api
COPY dist/ /opt/react-ssr-api/

RUN npm install
RUN npm install swagger-ui-express

# EXPOSE 3000

CMD ["node", "server.js"]
