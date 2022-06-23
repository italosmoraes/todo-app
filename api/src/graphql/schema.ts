export const typeDefs = `
    scalar Object

    type Query {
        todos: [Todo]
        users: Object
    }

    type Mutation {
        createTodo(input: TodoCreateInput): Todo!
        updateTodo(input: UpdateTodoInput): Todo!
        deleteTodo(input: DeleteTodoInput): Boolean!
        createUser(input: CreateUserInput): CreateUserResponse!
        login(input: LoginInput): LoginResponse!
    }

    type LoginResponse {
        user: User!
        token: String!
    }

    type CreateUserResponse {
        token: String!
        user: User!
    }

    input LoginInput {
        username: String!
        password: String!
    }

    input TodoCreateInput {
        text: String!
        dueAt: String
    }

    input UpdateTodoInput {
        todoId: String!
        text: String
        status: TodoStatus
        dueAt: String
    }

    input DeleteTodoInput {
        todoId: String!
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
        userId: String!
    }

    type Todo {
        id: String!
        text: String!
        status: TodoStatus!
        dueAt: String
    }

    enum TodoStatus {
        PENDING
        STARTED
        CANCELLED
        DELETED
        DONE
    }
`
