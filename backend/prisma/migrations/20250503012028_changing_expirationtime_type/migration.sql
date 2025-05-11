/*
  Warnings:

  - Changed the type of `expiration_date` on the `password_reset_token_storage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "password_reset_token_storage" DROP COLUMN "expiration_date",
ADD COLUMN     "expiration_date" INTEGER NOT NULL;
