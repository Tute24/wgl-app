/*
  Warnings:

  - You are about to drop the `requests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_related_wedding_fkey";

-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_request_by_fkey";

-- DropTable
DROP TABLE "requests";

-- CreateTable
CREATE TABLE "guest_requests" (
    "id" SERIAL NOT NULL,
    "request_by" TEXT NOT NULL,
    "related_wedding" INTEGER NOT NULL,
    "pending" BOOLEAN NOT NULL DEFAULT true,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "madeOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guest_requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "guest_requests" ADD CONSTRAINT "guest_requests_request_by_fkey" FOREIGN KEY ("request_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guest_requests" ADD CONSTRAINT "guest_requests_related_wedding_fkey" FOREIGN KEY ("related_wedding") REFERENCES "weddings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
