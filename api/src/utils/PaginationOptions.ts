import { GraphQLBoolean, GraphQLInt, GraphQLInterfaceType, GraphQLString } from 'graphql'

export interface PaginationOptions {
  limit: number
  cursor: string
  hasNextPage: boolean
}

const PaginationOptions = new GraphQLInterfaceType({
  name: 'PaginationOptions',
  description: 'Pagination utility',
  fields: {
    limit: { type: GraphQLInt },
    cursor: { type: GraphQLString },
    hasNextPage: { type: GraphQLBoolean }
  }
})
