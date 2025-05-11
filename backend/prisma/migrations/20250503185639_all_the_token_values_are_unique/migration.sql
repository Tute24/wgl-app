/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `password_reset_token_storage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "password_reset_token_storage_token_key" ON "password_reset_token_storage"("token");
