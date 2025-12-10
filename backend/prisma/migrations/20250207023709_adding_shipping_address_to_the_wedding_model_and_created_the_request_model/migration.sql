-- AlterTable
ALTER TABLE "weddings" ADD COLUMN     "shipping_address" TEXT NOT NULL DEFAULT 'null';

-- CreateTable
CREATE TABLE "Requests" (
    "id" SERIAL NOT NULL,
    "request_by" TEXT NOT NULL,
    "related_wedding" INTEGER NOT NULL,

    CONSTRAINT "Requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_request_by_fkey" FOREIGN KEY ("request_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_related_wedding_fkey" FOREIGN KEY ("related_wedding") REFERENCES "weddings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
