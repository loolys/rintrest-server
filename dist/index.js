"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _apolloServerExpress = require("apollo-server-express");

var _graphqlTools = require("graphql-tools");

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _test = require("./schemas/test");

var _test2 = _interopRequireDefault(_test);

var _test3 = require("./resolvers/test");

var _test4 = _interopRequireDefault(_test3);

var _PinSchema = require("./Models/PinSchema");

var _PinSchema2 = _interopRequireDefault(_PinSchema);

var _UserSchema = require("./Models/UserSchema");

var _UserSchema2 = _interopRequireDefault(_UserSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-polyfill");

require("dotenv/config");

var schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: _test2.default,
  resolvers: _test4.default
});

var connectString = process.env.MONGODB_URI || "mongodb://localhost/rintrest";

_mongoose2.default.connect(connectString);

var Cat = _mongoose2.default.model("Cat", { name: String });

var PORT = process.env.PORT || 8080;

var app = (0, _express2.default)();

// bodyParser is needed just for POST.
app.use("/graphql", _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)({ schema: schema, context: { Cat: Cat, Pin: _PinSchema2.default, User: _UserSchema2.default } }));

app.use("/graphiql", (0, _apolloServerExpress.graphiqlExpress)({
  endpointURL: "/graphql"
}));

app.use(_express2.default.static("build"));

app.route("/*").get(function (req, res) {
  res.sendFile(_path2.default.join(__dirname + "/build" + "/index.html"));
});

app.listen(PORT, function () {
  return console.log("running");
});