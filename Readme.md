## React SSR Advanced Seed (nestJS + React SSR + React Native + Nginx + Docker) 
## (Work In Progress)
[![Build Status](https://app.bitrise.io/app/d98e7b1dcb54c9ac/status.svg?token=8eD_bEhakpStCX1gMDqsiw)](https://app.bitrise.io/app/d98e7b1dcb54c9ac) [![Build Status](https://dev.azure.com/github0586/react-ssr-advanced/_apis/build/status/vip-git.react-ssr-advanced-seed?branchName=master)](https://dev.azure.com/github0586/react-ssr-advanced/_build/latest?definitionId=1&branchName=master) [![CircleCI](https://circleci.com/gh/vip-git/react-ssr-advanced-seed.svg?style=svg)](https://circleci.com/gh/vip-git/react-ssr-advanced-seed) [![npm version](https://badge.fury.io/js/npm.svg)](https://badge.fury.io/js/npm) [![dependencies](https://david-dm.org/vip-git/react-ssr-advanced-seed.svg)](https://david-dm.org/vip-git/react-ssr-advanced-seed) [![dev-dependencies](https://david-dm.org/vip-git/react-ssr-advanced-seed/dev-status.svg)](https://david-dm.org/vip-git/react-ssr-advanced-seed)

## Auto-Generated DOCS
- https://vip-git.github.io/react-ssr-advanced-seed (Backend)

### Prerequisites
- [Node.js 8.0+](http://nodejs.org)

### Todo List

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
npm run docker:prod
```

### Kubernetes Deployment
```
kubectl create -f deployment.yml
```

### DockerHub Image
```
- https://hub.docker.com/r/vipgit/react-ssr-nginx/

docker run -d -v /root/.ssh/ -v /opt/node-advanced-app vipgit/react-ssr-nginx:latest
```

### Testing (Unit and End to End Testing)
```
npm run test (Runs Backend Unit Tests)
npm run test:frontend (Runs Frontend Unit Tests)
npm run test:e2e (Runs Frontend End to End Tests)
```

