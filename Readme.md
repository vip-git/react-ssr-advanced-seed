# React SSR Advanced Seed (nestJS + React SSR + Docker) (Work In Progress)
[![Build Status](https://travis-ci.org/vip-git/node-advanced-api.svg?branch=master)](https://travis-ci.org/vip-git/node-advanced-api) [![npm version](https://badge.fury.io/js/npm.svg)](https://badge.fury.io/js/npm) [![dependencies](https://david-dm.org/vip-git/node-advanced-api.svg)](https://david-dm.org/vip-git/node-advanced-api) [![dev-dependencies](https://david-dm.org/vip-git/node-advanced-api/dev-status.svg)](https://david-dm.org/vip-git/node-advanced-api)

## DOCS
- https://vip-git.github.io/node-advanced-api/index.html

### Prerequisites
- [Node.js 8.0+](http://nodejs.org)


### Getting Started
```
npm install

npm start (This will start both frontend and backend servers for you)
```

### Production Build (Client and Server)
```
npm run build
```

### Docker Build
```
cd docker

docker build -t node-nginx-react .

docker run -d node-nginx-react
```

### DockerHub Image
```
- https://hub.docker.com/r/vipgit/nginx-node-git/

docker run -d -v /root/.ssh/ -v /opt/node-advanced-app vipgit/nginx-node-git:latest
```
