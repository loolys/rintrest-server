export default `
  type Cat {
    _id: String!
    name: String!
  }

  type Pin {
    _id: String!
    image: String!
    text: String!
    user: String!
    likeCount: Int!
    likes: [String]
  }


  type User {
    success: Boolean!
    username: String!
    password: String!
    error: Error
  }

  type Error {
    path: String!
    message: String
  }

  type LoginResponse {
    success: Boolean!
    token: String
    error: Error
  }

  type Query {
    allCats: [Cat!]!
    allPins: [Pin]!
    usersPins(header: String!): [Pin!]!
  }

  type Mutation {
    createCat(name: String!): Cat!
    createPin(image: String!,
      text: String!,
      user: String!,
      likeCount: Int): Pin!
    createUser(username: String!,
      password: String!
    ): User!
    loginUser(username: String!,
      password: String!): LoginResponse!
    likePin(username: String!, id: String!): Pin!
  }
`;
