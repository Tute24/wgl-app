/*
  Warnings:

  - You are about to drop the column `gifted_by` on the `Gifts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Gifts" DROP CONSTRAINT "Gifts_gifted_by_fkey";

-- AlterTable
ALTER TABLE "Gifts" DROP COLUMN "gifted_by";

-- CreateTable
CREATE TABLE "GiftedBy" (
    "id" SERIAL NOT NULL,
    "presenter" TEXT NOT NULL,
    "related_wedding" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "gift_reference" INTEGER NOT NULL,

    CONSTRAINT "GiftedBy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GiftedBy" ADD CONSTRAINT "GiftedBy_presenter_fkey" FOREIGN KEY ("presenter") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftedBy" ADD CONSTRAINT "GiftedBy_related_wedding_fkey" FOREIGN KEY ("related_wedding") REFERENCES "weddings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftedBy" ADD CONSTRAINT "GiftedBy_gift_reference_fkey" FOREIGN KEY ("gift_reference") REFERENCES "Gifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
