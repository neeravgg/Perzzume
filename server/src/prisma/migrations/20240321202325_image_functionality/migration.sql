/*
  Warnings:

  - Added the required column `user_name` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_url` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_url` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_url` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_url` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_url` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "About" ADD COLUMN     "user_name" TEXT NOT NULL,
ADD COLUMN     "user_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "user_name" TEXT NOT NULL,
ADD COLUMN     "user_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "user_name" TEXT NOT NULL,
ADD COLUMN     "user_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "user_name" TEXT NOT NULL,
ADD COLUMN     "user_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "user_name" TEXT NOT NULL,
ADD COLUMN     "user_url" TEXT NOT NULL;
