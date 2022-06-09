export const typeDefs = `
    scalar Object

    type Query {
        todos: Object
        users: Object
    }

    type Mutation {
        create(input: TodoCreateInput): Todo!
    }

    input TodoCreateInput {
        text: String!
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
