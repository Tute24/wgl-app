/*
  Warnings:

  - You are about to drop the column `gift_reference` on the `gifted_by` table. All the data in the column will be lost.
  - Added the required column `gift_name` to the `gifted_by` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "gifted_by" DROP CONSTRAINT "gifted_by_gift_reference_fkey";

-- AlterTable
ALTER TABLE "gifted_by" DROP COLUMN "gift_reference",
ADD COLUMN     "gift_name" INTEGER NOT NULL;
