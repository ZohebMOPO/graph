const { ApolloServer } = require("apollo-server");
const path = require("path");
const fs = require("fs");

let links = [
  {
    id: "link-0",
    description: "My GitHub",
    url: "https://github.com/ZohebMOPO",
  },
  {
    id: "link-1",
    description: "HurricaneTwister",
    url: "https://www.instagram.com/wessnowboard/",
  },
];

// 1
let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    post: (prt, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    deleteLink: (prt) => {
      const del = {
        id: `link - ${idCount--}`,
      };
      links.pop(del);
      return del;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server running at ${url}`));
