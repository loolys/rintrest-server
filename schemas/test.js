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
  }
`;
