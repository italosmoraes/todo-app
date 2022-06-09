export const typeDefs = `
    scalar Object

    type Query {
        todos: Object
        users: Object
    }

    type Mutation {
        createTodo(input: TodoCreateInput): Todo!
        createUser(input: CreateUserInput): User!
    }

    input TodoCreateInput {
        text: String!
    }

    input CreateUserInput {
        firstName: String!
        lastName: String!
        username: String!
    }

    type User {
        firstName: String!
        lastName: String!
        username: String!
    }

    type Todo {
        text: String!
        status: TodoStatus!
    }

    enum TodoStatus {
        PENDING
        STARTED
        CANCELLED
        DELETED
        DONE
    }
`
