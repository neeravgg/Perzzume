/*
  Warnings:

  - You are about to drop the column `user_name` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `user_url` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `user_url` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `user_url` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `user_url` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `user_url` on the `Skill` table. All the data in the column will be lost.
  - Added the required column `image_name` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_name` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_name` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_name` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_name` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "About" DROP COLUMN "user_name",
DROP COLUMN "user_url",
ADD COLUMN     "image_name" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "user_name",
DROP COLUMN "user_url",
ADD COLUMN     "image_name" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "user_name",
DROP COLUMN "user_url",
ADD COLUMN     "image_name" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "user_name",
DROP COLUMN "user_url",
ADD COLUMN     "image_name" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "user_name",
DROP COLUMN "user_url",
ADD COLUMN     "image_name" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL;
