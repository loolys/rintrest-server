require("babel-polyfill");
import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { graphiqlExpress } from "apollo-server-express";
import mongoose from "mongoose";
import path from "path";
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

const PORT = process.env.PORT || 8080;

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

app.use(express.static("build"));

app.route("/*").get((req, res) => {
  res.sendFile(path.join(__dirname + "/build" + "/index.html"));
});

app.listen(PORT, () => console.log("running"));
