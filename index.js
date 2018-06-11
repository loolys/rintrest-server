import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { graphiqlExpress } from "apollo-server-express";
import mongoose from "mongoose";
require("dotenv/config");

import typeDefs from "./schemas/test";
import resolvers from "./resolvers/test";
import Pin from "./Models/PinSchema";
import User from "./Models/UserSchema";

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
  graphqlExpress({ schema, context: { Cat, Pin, User } })
);

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

app.listen(PORT);
