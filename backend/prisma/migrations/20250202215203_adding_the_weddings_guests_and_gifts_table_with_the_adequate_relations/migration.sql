/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weddings" (
    "id" SERIAL NOT NULL,
    "wedding_title" TEXT NOT NULL,
    "wedding_date" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "weddings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gifts" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_link" TEXT NOT NULL,
    "from_wedding" INTEGER NOT NULL,
    "gifted_by" TEXT NOT NULL,

    CONSTRAINT "Gifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guests" (
    "id" SERIAL NOT NULL,
    "guest_id" TEXT NOT NULL,
    "referenced_wedding" INTEGER NOT NULL,

    CONSTRAINT "Guests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "weddings" ADD CONSTRAINT "weddings_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gifts" ADD CONSTRAINT "Gifts_from_wedding_fkey" FOREIGN KEY ("from_wedding") REFERENCES "weddings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gifts" ADD CONSTRAINT "Gifts_gifted_by_fkey" FOREIGN KEY ("gifted_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guests" ADD CONSTRAINT "Guests_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guests" ADD CONSTRAINT "Guests_referenced_wedding_fkey" FOREIGN KEY ("referenced_wedding") REFERENCES "weddings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
