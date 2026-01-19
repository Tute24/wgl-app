-- DropForeignKey
ALTER TABLE "gift_contributions" DROP CONSTRAINT "gift_contributions_related_wedding_fkey";

-- DropForeignKey
ALTER TABLE "gifts" DROP CONSTRAINT "gifts_from_wedding_fkey";

-- DropForeignKey
ALTER TABLE "guests" DROP CONSTRAINT "guests_referenced_wedding_fkey";

-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_related_wedding_fkey";

-- AddForeignKey
ALTER TABLE "gifts" ADD CONSTRAINT "gifts_from_wedding_fkey" FOREIGN KEY ("from_wedding") REFERENCES "weddings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_referenced_wedding_fkey" FOREIGN KEY ("referenced_wedding") REFERENCES "weddings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_related_wedding_fkey" FOREIGN KEY ("related_wedding") REFERENCES "weddings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gift_contributions" ADD CONSTRAINT "gift_contributions_related_wedding_fkey" FOREIGN KEY ("related_wedding") REFERENCES "weddings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
