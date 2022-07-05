const { PrismaClient } = require('@prisma/client');
const { nanoid } = require('nanoid');

const prisma = new PrismaClient();

const findAll = async (ctx) => {
  const products = await prisma.products.findMany({
    include: {
      gallery: true,
      tags: true,
    },
  });

  ctx.body = products;
};

const create = async (ctx) => {
  const { gallery, tags, ...productData } = ctx.request.body;
  const sku = `PDT-${nanoid(10)}`;

  const product = await prisma.products.create({
    include: {
      gallery: true,
      tags: true,
    },
    data: {
      ...productData,
      sku,
      tags: {
        create: tags,
      },
      gallery: {
        create: gallery,
      },
    },
  });

  ctx.body = product;
};

const update = async (ctx) => {
  const { gallery, tags, ...productData } = ctx.request.body;

  const product = await prisma.products.update({
    include: {
      gallery: true,
    },
    where: {
      sku: ctx.params.sku,
    },
    data: {
      ...productData,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: {
            slug: tag.slug,
          },
          create: tag,
        })),
      },
      gallery: {
        create: gallery,
      },
    },
  });

  ctx.body = product;
  ctx.status = product ? 200 : 404;
};

const destroy = async (ctx) => {
  const { sku } = ctx.params;

  await prisma.products.delete({
    where: {
      sku,
    },
  });

  ctx.status = 201;
};

const findBySku = async (ctx) => {
  const product = await prisma.products.findUnique({
    include: {
      gallery: true,
    },
    where: {
      sku: ctx.params.sku,
    },
  });

  ctx.body = product;
  ctx.status = product ? 200 : 404;
};

const findByTag = async (ctx) => {
  const products = await prisma.products.findMany({
    include: {
      tags: true,
      gallery: true,
    },
    where: {
      tags: {
        every: {
          slug: ctx.params.tag,
        },
      },
    },
  });

  ctx.body = products;
  ctx.status = products ? 200 : 404;
};

module.exports = {
  create,
  findBySku,
  findAll,
  findByTag,
  update,
  destroy,
};
