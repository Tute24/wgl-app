-- DropForeignKey
ALTER TABLE "Gifts" DROP CONSTRAINT "Gifts_gifted_by_fkey";

-- AlterTable
ALTER TABLE "Gifts" ALTER COLUMN "gifted_by" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Gifts" ADD CONSTRAINT "Gifts_gifted_by_fkey" FOREIGN KEY ("gifted_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
