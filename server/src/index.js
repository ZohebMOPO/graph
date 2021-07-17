const { ApolloServer } = require("apollo-server");

const typeDefs = `
 type Query {
     info: String!
 }
`;

const resolvers = {
  Query: {
    info: () => `This is an demo API`,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server running at ${url}`));
