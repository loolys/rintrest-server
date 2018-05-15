import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { graphiqlExpress } from "apollo-server-express";
import mongoose from "mongoose";

import typeDefs from "./schemas/test";
import resolvers from "./resolvers/test";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

mongoose.connect("mongodb://localhost/rintrest");

const Cat = mongoose.model("Cat", { name: String });

const PORT = 8080;

const app = express();

// bodyParser is needed just for POST.
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({ schema, context: { Cat } })
);

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

app.listen(PORT);