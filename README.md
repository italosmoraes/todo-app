## TODO application - Italo Moraes

### The requirement
Create a full stack todo application

- Create a monorepo (recommended nrwl)
- Setup data layer (Recommended typeorm)
- Setup server service (recommended fastify, type-graphql and Apollo server)
- Setup client application ( react app - recommended Apollo-graphql  - hooks)
- Setup local environment (recommended docker-compose  or Kubernetes / helm)


### Notes on the solution

- A nodejs express server exposing a graphql endpoint, using express-graphql lib
- A few notes on TODOs and improvements are written across the codebase

- The solution offers users signup and login, so we can tie a Todo to an owner
- A todo can created, updated and deleted

Task list:

- (/) create user
- (/) login
- (/) create todo API
- (/) create todo FE
- (/) update todo API
- (/) delete todo API
- (/) make local env available for usage
- () dockerfile for api
- () dockerfile for web-app
- () update todo FE
- () delete todo FE
- () e2e graphql resolvers tests on the API


### Environment
---------------

This project was built using:
- yarn
- nvm
- Node v16.15.0
- Graphql endpoints
- Mongodb
- Typeorm
- Jest
- Typescript
- VSCode
- docker
- docker-compose
- React

### To build locally
--------------------

1. install docker


#### Make a mongodb available
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
-------------------------------------

API:
- the authorization middleware needs to be better wrapped around specific resolvers. as it is, there is a lot of repetition. Ideally the graphql server would (like https://jkettmann.com/authorization-with-graphql-and-custom-directives#)
- the modules, in reality, only represent resolvers. create actual grapqhl modules would be ideal: https://www.the-guild.dev/blog/graphql-modules-auth
- having the graphql typeDefs in a text file is messy and does not easily map into Typescript representations of the same. Another way to map those is needed

Web-app:
- UI improvements

General:
- types should be shared through a lib which can be imported by each project
 

### Notes on the task
-------------------------------------
