/*
  Warnings:

  - You are about to drop the `gifted_by` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `password_reset_token_storage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "gifted_by" DROP CONSTRAINT "gifted_by_presenter_fkey";

-- DropForeignKey
ALTER TABLE "gifted_by" DROP CONSTRAINT "gifted_by_related_wedding_fkey";

-- DropForeignKey
ALTER TABLE "password_reset_token_storage" DROP CONSTRAINT "password_reset_token_storage_requested_by_fkey";

-- DropTable
DROP TABLE "gifted_by";

-- DropTable
DROP TABLE "password_reset_token_storage";

-- CreateTable
CREATE TABLE "gift_contributions" (
    "id" SERIAL NOT NULL,
    "presenter" TEXT NOT NULL,
    "related_wedding" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "gift_name" TEXT NOT NULL,
    "giftedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gift_contributions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset_tokens" (
    "id" SERIAL NOT NULL,
    "requested_by" TEXT NOT NULL,
    "expiration_date" BIGINT NOT NULL,
    "used" BOOLEAN NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_token_key" ON "password_reset_tokens"("token");

-- AddForeignKey
ALTER TABLE "gift_contributions" ADD CONSTRAINT "gift_contributions_presenter_fkey" FOREIGN KEY ("presenter") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gift_contributions" ADD CONSTRAINT "gift_contributions_related_wedding_fkey" FOREIGN KEY ("related_wedding") REFERENCES "weddings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_requested_by_fkey" FOREIGN KEY ("requested_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
