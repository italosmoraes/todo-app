export interface TodoCreateInput {
  text: string
  dueAt?: string
}

export interface UpdateTodoInput {
  todoId: string
  status: TodoStatus
  text?: string
  dueAt?: string
}

export interface DeleteTodoInput {
  todoId: string
}

export interface DeleteTodoResponse {
  deleted: boolean
}

export enum TodoStatus {
  PENDING = 'PENDING',
  STARTED = 'STARTED',
  CANCELLED = 'CANCELLED',
  DELETED = 'DELETED',
  DONE = 'DONE'
}

export interface Todo {
  id: string
  text: string
  status: TodoStatus
}
