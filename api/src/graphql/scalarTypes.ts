import { GraphQLScalarType } from 'graphql'

export default new GraphQLScalarType({
  name: 'Object',
  description: 'Represents an arbitrary JSON object',
  parseValue: (value) => value,
  serialize: (value) => value,
  parseLiteral(value) {
    return value
  }
})
