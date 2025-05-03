/*
  Warnings:

  - Added the required column `token` to the `password_reset_token_storage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "password_reset_token_storage" ADD COLUMN     "token" TEXT NOT NULL;
