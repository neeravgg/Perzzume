/*
  Warnings:

  - A unique constraint covering the columns `[id,user_id]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,user_id]` on the table `Experience` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,user_id]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,user_id]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,user_id]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Contact_id_user_id_key" ON "Contact"("id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Experience_id_user_id_key" ON "Experience"("id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_user_id_key" ON "Project"("id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_id_user_id_key" ON "Skill"("id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Token_id_user_id_key" ON "Token"("id", "user_id");
