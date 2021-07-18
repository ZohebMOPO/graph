const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");

const { PrismaClient } = require("@prisma/client");
const { ApolloServer } = require("apollo-server");
const path = require("path");
const fs = require("fs");
const { getUserId } = require("./utils");

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
  },
  Mutation: {
    post: (parent, args, context) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
      return newLink;
    },
    delete: (parent, args, context) => {
      const id = +args.id;
      const delLink = context.prisma.link.delete({
        where: {
          id,
        },
      });
      return delLink;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: req && req.headers.authorization ? getUserId : null,
    };
  },
});

server.listen().then(({ url }) => console.log(`Server running at ${url}`));
