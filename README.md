## TODO application - Italo Moraes

### The requirement
Create a full stack todo application

- Create a monorepo (recommended nrwl)
- Setup data layer (Recommended typeorm )
- Setup server service (recommended fastify, type-graphql and Apollo server)
- Setup client application ( react app - recommended Apollo-graphql  - hooks)
- Setup local environment (recommended docker-compose  or Kubernetes / helm)


### Notes on the solution

- A nodejs express server exposing a graphql endpoint
- A few notes on TODOs and improvements are written across the codebase

### Environment
---------------

This project was built using:
- yarn
- nvm
- Node v16.15.0
- Graphql endpoints
- Typeorm
- Jest
- Typescript
- VSCode
- docker
- docker-compose

### To build locally
--------------------

1. install docker


#### 
```
docker-compose up
```

#### API:
----
...while in the api folder

```
nvm use
```

```
yarn
```

```
yarn dev
```

Suggestion on testing the api directly:
1. download https://insomnia.rest/

#### Web-App:
----
...with the API running locally
and
...while in the web-app folder


```
nvm use
```

```
yarn
```

```
yarn start
```

### To run test suite:
--------------------

API:
```
nvm use

yarn

yarn test
```


### Potential improvements and notes


### Notes on the task
