## React SSR Advanced Seed 
## (nestJS + React SSR + React Native + Nginx + Docker) 
## (Work In Progress) Major Changes with GRAPHQL Integration WIP can be [seen here](https://github.com/vip-git/react-ssr-advanced-seed/tree/v2)
## [![Netlify Status](https://api.netlify.com/api/v1/badges/e4099e33-94ff-48df-be74-1b7021ff7f73/deploy-status)](https://app.netlify.com/sites/confident-mestorf-ab8ce9/deploys) [![Build Status](https://app.bitrise.io/app/d98e7b1dcb54c9ac/status.svg?token=8eD_bEhakpStCX1gMDqsiw)](https://app.bitrise.io/app/d98e7b1dcb54c9ac) [![Build Status](https://dev.azure.com/github0586/react-ssr-advanced/_apis/build/status/vip-git.react-ssr-advanced-seed?branchName=master)](https://dev.azure.com/github0586/react-ssr-advanced/_build/latest?definitionId=1&branchName=master) [![CircleCI](https://circleci.com/gh/vip-git/react-ssr-advanced-seed.svg?style=svg)](https://circleci.com/gh/vip-git/react-ssr-advanced-seed) [![codecov](https://codecov.io/gh/vip-git/react-ssr-advanced-seed/branch/master/graph/badge.svg)](https://codecov.io/gh/vip-git/react-ssr-advanced-seed) [![BrowserStack Status](https://automate.browserstack.com/badge.svg?badge_key=azRlSERPMk9WVXgrelpDaXhFZDVkLzNRaWNJRDdkcjFITFNRWjZLRlB2Zz0tLTZyRkhkTlk1NUlnQjV5a3k5VEJYS1E9PQ==--f114f4042280467288793c3247af19e34c10d8b0%)](https://automate.browserstack.com/public-build/azRlSERPMk9WVXgrelpDaXhFZDVkLzNRaWNJRDdkcjFITFNRWjZLRlB2Zz0tLTZyRkhkTlk1NUlnQjV5a3k5VEJYS1E9PQ==--f114f4042280467288793c3247af19e34c10d8b0%)

## [![npm version](https://badge.fury.io/js/npm.svg)](https://badge.fury.io/js/npm) [![dependencies](https://david-dm.org/vip-git/react-ssr-advanced-seed.svg)](https://david-dm.org/vip-git/react-ssr-advanced-seed) [![dev-dependencies](https://david-dm.org/vip-git/react-ssr-advanced-seed/dev-status.svg)](https://david-dm.org/vip-git/react-ssr-advanced-seed)

## Auto-Generated DOCS
- https://vip-git.github.io/react-ssr-advanced-seed (Backend)

### Prerequisites
- [Node.js 8.0+](http://nodejs.org)

### Todo List

### Getting Started
```
npm install

npm start (This will start both frontend and backend servers for you)

Visit: 
- http://localhost:8500 (FrontEnd with HMR)
- http://localhost:3000 (Backend running NestJS)
- http://localhost:3000/graphql (Graphql server running graphQL playground theme)
- http://localhost:3000/swagger (running Swagger UI)
```

### Production Build (Client and Server)
```
npm run build
```

### Docker Build (Frontend)
```
npm run start:docker
```
Visit: http://localhost:8080

### Mobile Build
```
npm run install:mobile (Install mobile dependencies)

Packager: npm run start:mobile

ios: npm run mobile:ios
android: npm run mobile:android 
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

### Lerna Packages and its use
##### Web Components
    - ChatBox
    - Dialog
    - DocGen
    - Wrapper

##### React-Native-Web Components 
    - Shared

##### Web Containers
    - Chat
    - Login

##### Mobile Containers
    - Chat

##### Mobile Components
    - Chatbox

##### Services
    - Core
    - Chat Service
    - User Service

##### State
    - Chat

##### Utils
    - Doc Engine
    - Rules Engine
