const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Subscription = require("./resolvers/Subscription");

const { PrismaClient } = require("@prisma/client");
const { ApolloServer } = require("apollo-server");
const { PubSub } = require("apollo-server");
const path = require("path");
const fs = require("fs");
const { getUserId } = require("./utils");

const prisma = new PrismaClient();
const pubsub = new PubSub();

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId : null,
    };
  },
});

server.listen().then(({ url }) => console.log(`Server running at ${url}`));
