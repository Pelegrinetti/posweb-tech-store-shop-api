const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const findUniqueTags = async (ctx) => {
  const tags =
    await prisma.$queryRaw`SELECT DISTINCT name, slug FROM ProductTag;`;

  ctx.body = tags;
  ctx.status = 200;
};

module.exports = {
  findUniqueTags,
};
