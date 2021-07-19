function newLinkSubscribe(parents, args, context, info) {
  return context.pubsub.asyncIterator("NEW_LINK");
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => {
    return payload;
  },
};

module.exports = {
  newLink,
};
