-- CreateTable
CREATE TABLE "password_reset_token_storage" (
    "id" SERIAL NOT NULL,
    "requested_by" TEXT NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL,

    CONSTRAINT "password_reset_token_storage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "password_reset_token_storage" ADD CONSTRAINT "password_reset_token_storage_requested_by_fkey" FOREIGN KEY ("requested_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
