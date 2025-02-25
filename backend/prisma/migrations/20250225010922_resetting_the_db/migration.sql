/*
  Warnings:

  - You are about to drop the `GiftedBy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Gifts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Guests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Requests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GiftedBy" DROP CONSTRAINT "GiftedBy_gift_reference_fkey";

-- DropForeignKey
ALTER TABLE "GiftedBy" DROP CONSTRAINT "GiftedBy_presenter_fkey";

-- DropForeignKey
ALTER TABLE "GiftedBy" DROP CONSTRAINT "GiftedBy_related_wedding_fkey";

-- DropForeignKey
ALTER TABLE "Gifts" DROP CONSTRAINT "Gifts_from_wedding_fkey";

-- DropForeignKey
ALTER TABLE "Guests" DROP CONSTRAINT "Guests_guest_id_fkey";

-- DropForeignKey
ALTER TABLE "Guests" DROP CONSTRAINT "Guests_referenced_wedding_fkey";

-- DropForeignKey
ALTER TABLE "Requests" DROP CONSTRAINT "Requests_related_wedding_fkey";

-- DropForeignKey
ALTER TABLE "Requests" DROP CONSTRAINT "Requests_request_by_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "weddings" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "GiftedBy";

-- DropTable
DROP TABLE "Gifts";

-- DropTable
DROP TABLE "Guests";

-- DropTable
DROP TABLE "Requests";

-- CreateTable
CREATE TABLE "gifts" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_link" TEXT NOT NULL,
    "from_wedding" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guests" (
    "id" SERIAL NOT NULL,
    "guest_id" TEXT NOT NULL,
    "referenced_wedding" INTEGER NOT NULL,
    "addedOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requests" (
    "id" SERIAL NOT NULL,
    "request_by" TEXT NOT NULL,
    "related_wedding" INTEGER NOT NULL,
    "request_by_name" TEXT NOT NULL,
    "wedding_title" TEXT NOT NULL,
    "pending" BOOLEAN NOT NULL DEFAULT true,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "madeOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gifted_by" (
    "id" SERIAL NOT NULL,
    "presenter" TEXT NOT NULL,
    "related_wedding" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "gift_reference" INTEGER NOT NULL,
    "giftedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gifted_by_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "gifts" ADD CONSTRAINT "gifts_from_wedding_fkey" FOREIGN KEY ("from_wedding") REFERENCES "weddings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_referenced_wedding_fkey" FOREIGN KEY ("referenced_wedding") REFERENCES "weddings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_request_by_fkey" FOREIGN KEY ("request_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_related_wedding_fkey" FOREIGN KEY ("related_wedding") REFERENCES "weddings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gifted_by" ADD CONSTRAINT "gifted_by_presenter_fkey" FOREIGN KEY ("presenter") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gifted_by" ADD CONSTRAINT "gifted_by_related_wedding_fkey" FOREIGN KEY ("related_wedding") REFERENCES "weddings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gifted_by" ADD CONSTRAINT "gifted_by_gift_reference_fkey" FOREIGN KEY ("gift_reference") REFERENCES "gifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
