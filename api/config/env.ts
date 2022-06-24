// environment variables resolving

export const JWT_SECRET = process.env.JWT_SECRET || 'todo-app-token-$$'

export const MONGODB_HOST = process.env.MONGODB_URI || 'localhost'

export const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'local'
