const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (ctx) => {
  const { items, ...rest } = ctx.request.body;

  const order = await prisma.order.create({
    include: {
      order_items: true,
    },
    data: {
      ...rest,
      order_items: {
        create: items,
      },
    },
  });

  ctx.body = order;
  ctx.status = 201;
};

const listByUserId = async (ctx) => {
  const orders = await prisma.order.findMany({
    include: {
      order_items: {
        include: {
          product: {
            include: {
              gallery: true
            }
          },
        },
      },
    },
    where: {
      user_id: ctx.params.id,
    },
  });

  ctx.body = orders;
  ctx.status = orders ? 200 : 404;
};

module.exports = {
  create,
  listByUserId,
};
