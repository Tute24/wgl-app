-- AlterTable
ALTER TABLE "Requests" ADD COLUMN     "accepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pending" BOOLEAN NOT NULL DEFAULT true;
