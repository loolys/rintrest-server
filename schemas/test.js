export default `
  type Cat {
    _id: String!
    name: String!
  }

  type Pin {
    image: String!
    text: String!
    user: String!
    likeCount: Int!
    likes: [String]
  }

  type User {
    username: String!
    password: String!
  }

  type LoginResponse {
    success: Boolean!
  }

  type Query {
    allCats: [Cat!]!
    allPins: [Pin]!
  }

  type Mutation {
    createCat(name: String!): Cat!
    createPin(image: String!,
      text: String!,
      user: String!,
      likeCount: Int,
      likes: String): Pin!
    createUser(username: String!,
      password: String!
    ): User!
    loginUser(username: String!,
      password: String!): LoginResponse!
  }
`;
