function feed(parents, args, context, info) {
  return context.prisma.link.findMany();
}

module.exports = { feed };
