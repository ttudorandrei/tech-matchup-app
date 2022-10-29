const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Matchup {
    _id: ID!
    tech1: String!
    tech2: String!
    tech1_votes: Int
    tech2_votes: Int
  }

  type Query {
    matchups(_id: String): [Matchup]
  }
  # type Mutation {}
`;

module.exports = typeDefs;
