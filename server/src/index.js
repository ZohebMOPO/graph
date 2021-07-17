const { ApolloServer } = require("apollo-server");

const typeDefs = `
 type Query {
    info: String!
    feed: [Link!]!
    image: [Img!]!
 }
 type Link{
     id: ID!
     description: String!
     url: String!
 }
 type Img {
     id: ID!
     image: String!
     description: String!
 }
`;

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

let images = [
  {
    id: "img-0",
    image:
      "https://instagram.fbbi1-2.fna.fbcdn.net/v/t51.2885-19/s320x320/188587663_118291377040366_4967903207357042455_n.jpg?_nc_ht=instagram.fbbi1-2.fna.fbcdn.net&_nc_ohc=fulmrOEX-sEAX8ZN8yY&edm=ABfd0MgBAAAA&ccb=7-4&oh=761145d7ba0ae94567fa2db45ef2ecd1&oe=60F8FF5D&_nc_sid=7bff83",
    description: "It's me lol",
  },
];

const resolvers = {
  Query: {
    info: () => `This is an demo API`,
    feed: () => links,
    image: () => images,
  },

  Link: {
    id: (prt) => prt.id,
    description: (prt) => prt.description,
    url: (prt) => prt.url,
  },

  Img: {
    id: (prt) => prt.id,
    description: (prt) => prt.description,
    image: (prt) => prt.image,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server running at ${url}`));
