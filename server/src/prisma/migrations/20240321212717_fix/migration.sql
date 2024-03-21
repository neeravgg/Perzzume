/*
  Warnings:

  - You are about to drop the column `image_name` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "image_name",
DROP COLUMN "image_url";
