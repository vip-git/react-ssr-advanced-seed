## React SSR Advanced Seed (nestJS + React SSR + Nginx + Docker) 
## (Work In Progress)
[![Build Status](https://travis-ci.org/vip-git/react-ssr-advanced-seed.svg?branch=master)](https://travis-ci.org/vip-git/react-ssr-advanced-seed) [![npm version](https://badge.fury.io/js/npm.svg)](https://badge.fury.io/js/npm) [![dependencies](https://david-dm.org/vip-git/react-ssr-advanced-seed.svg)](https://david-dm.org/vip-git/node-advanced-api) [![dev-dependencies](https://david-dm.org/vip-git/react-ssr-advanced-seed/dev-status.svg)](https://david-dm.org/vip-git/react-ssr-advanced-seed)

## DOCS
- https://vip-git.github.io/react-ssr-advanced-seed/index.html

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
- https://hub.docker.com/r/vipgit/react-ssr-nginx/

docker run -d -v /root/.ssh/ -v /opt/node-advanced-app vipgit/react-ssr-nginx:latest
```
