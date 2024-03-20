/*
  Warnings:

  - You are about to drop the column `isValid` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `Token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_agent` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valid_status` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "isValid",
DROP COLUMN "userAgent",
ADD COLUMN     "user_agent" TEXT NOT NULL,
ADD COLUMN     "valid_status" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contact_user_id_key" ON "Contact"("user_id");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
