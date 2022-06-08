const { PrismaClient } = require('@prisma/client');
const { nanoid } = require('nanoid');

const prisma = new PrismaClient();

const findAll = async (ctx) => {
  const products = await prisma.products.findMany();

  ctx.body = products;
};

const create = async (ctx) => {
  const { gallery, ...productData } = ctx.request.body;
  const sku = `PDT-${nanoid(10)}`;

  const product = await prisma.products.create({
    include: {
      gallery: true,
    },
    data: {
      ...productData,
      sku,
      gallery: {
        create: gallery,
      },
    },
  });

  ctx.body = product;
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

  console.log('Oi', product);

  ctx.body = product;
  ctx.status = product ? 200 : 404;
};

module.exports = {
  create,
  findBySku,
  findAll,
};
