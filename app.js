var express = require('express');
var {  graphqlHTTP } = require('express-graphql');
const Mongoose = require('mongoose')

var schema = require('./graphqlSchema/recipeLinkSchemas');

var cors = require('cors')
var app = express();

Mongoose.connect('mongodb://localhost/MyProject',{useNewUrlParser: true, useUnifiedTopology: true});
app.use('/_graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true,
}));


app.listen(4000, () => console.log('Now browse to localhost:4000/_graphql'));



