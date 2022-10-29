const { Matchup } = require("../models");

const resolvers = {
  Query: {
    matchups: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Matchup.find(params);
    },
  },
  // Mutation: {},
};

module.exports = resolvers;
