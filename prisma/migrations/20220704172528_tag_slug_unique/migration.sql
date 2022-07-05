/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `ProductTag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ProductTag_slug_key` ON `ProductTag`(`slug`);
