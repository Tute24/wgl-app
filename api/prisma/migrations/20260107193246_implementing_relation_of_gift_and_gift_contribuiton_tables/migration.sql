/*
  Warnings:

  - You are about to drop the column `gift_name` on the `gift_contributions` table. All the data in the column will be lost.
  - Added the required column `gift_id` to the `gift_contributions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gift_contributions" DROP COLUMN "gift_name",
ADD COLUMN     "gift_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "gift_contributions" ADD CONSTRAINT "gift_contributions_gift_id_fkey" FOREIGN KEY ("gift_id") REFERENCES "gifts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
