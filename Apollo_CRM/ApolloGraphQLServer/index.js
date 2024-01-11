require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const DB = require('./config/db');
const jwt = require('jsonwebtoken');

DB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers['authorization'] || '';

    if (token !== '') {
      try {
        const user = jwt.verify(
          token.replace('Bearer ', ''),
          process.env.SECRET_WORD
        );

        return { user };
      } catch (error) {
        console.log(error);
      }
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready on PORT ${url}`);
});
