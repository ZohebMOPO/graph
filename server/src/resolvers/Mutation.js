const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { APP_SECRET, getUserId } = require("../utils.js");

async function signup(parents, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parents, args, context, info) {
  const user = await context.prisma.user.findUnique({
    where: {
      email: args.email,
    },
  });

  if (!user) {
    throw new Error("User not found!");
  }

  const valid = await bcrypt.compare(args.password, user.password);

  if (!valid) {
    throw new Error("Password is incorrect");
  }
  return {
    token,
    user,
  };
}

async function post(parents, args, context, info) {
  const { userId } = context;
  const new_link = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });

  context.pubsub.publish("NEW_LINK", new_link);

  return new_link;
}

module.exports = {
  signup,
  login,
  post,
};
