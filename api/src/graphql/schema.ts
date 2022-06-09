export const typeDefs = `
    scalar Object

    type Query {
        todos: Object
        users: Object
    }

    type Mutation {
        createTodo(input: TodoCreateInput): Todo!
        updateTodo(input: UpdateTodoInput): Todo!
        createUser(input: CreateUserInput): CreateUserResponse!
        login(input: LoginInput): LoginResponse!
    }

    type LoginResponse {
        token: String!
    }

    type CreateUserResponse {
        token: String!
    }

    input LoginInput {
        username: String!
        password: String!
    }

    input TodoCreateInput {
        text: String!
    }

    input UpdateTodoInput {
        todoId: String!
        text: String
        status: TodoStatus
    }

    input CreateUserInput {
        firstName: String!
        lastName: String!
        username: String!
        password: String!
    }

    type User {
        firstName: String!
        lastName: String!
        username: String!
    }

    type Todo {
        id: String!
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
