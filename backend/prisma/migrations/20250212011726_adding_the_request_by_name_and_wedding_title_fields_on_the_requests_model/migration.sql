/*
  Warnings:

  - Added the required column `request_by_name` to the `Requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wedding_title` to the `Requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Requests" ADD COLUMN     "request_by_name" TEXT NOT NULL,
ADD COLUMN     "wedding_title" TEXT NOT NULL;
