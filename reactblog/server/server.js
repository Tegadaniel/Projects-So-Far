var express = require('express')
var Schema = require('./schema')
var graphQLHTTP = require('express-graphql')
var expressGraphQL = require('express-graphql');
var bodyParser = require('body-parser');

var app = express()
app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema: Schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;