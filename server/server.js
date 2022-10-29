const express = require("express");
const path = require("path");
const db = require("./config/connection");
const routes = require("./routes");
const { createServer } = require("http");
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { gql } = require("apollo-server");

(async function () {
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `;

  // create express app
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }
  app.use(routes);

  // wrap it in http server
  const httpServer = createServer(app);

  // make a gql schema
  const schema = makeExecutableSchema({ typeDefs });

  // create apollo server with typedefs and resolvers (typedefs required for the server to run)
  const server = new ApolloServer({
    schema,
  });

  // start gql server
  await server.start();

  // apply express as middleware
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 3001;

  // run the server on successful connection to db
  db.once("open", () => {
    httpServer.listen(PORT, () =>
      console.log(`Now listening on http://localhost:${PORT}/graphql`)
    );
  });
})();
