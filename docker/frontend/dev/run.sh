#!/bin/bash -e
chmod 700 /root/.ssh/id_rsa
touch /root/.ssh/known_hosts
ssh-keyscan ${GIT_PROVIDER} >> /root/.ssh/known_hosts

if [ -d "/opt/node-advanced-app" ]; then
    cd /opt/node-advanced-app
    git checkout .
    git pull --force
else
    git clone -b ${GIT_BRANCH} ${GIT_REPO} /opt/node-advanced-app
    cd /opt/node-advanced-app
fi

npm install
npm run build && rm -rf /usr/share/nginx/html/* && cp -R /opt/node-advanced-app/build/client/* /usr/share/nginx/html && npm run server

# start nginx
nginx -g 'daemon off;'
