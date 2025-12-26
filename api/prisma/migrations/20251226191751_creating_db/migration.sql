-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weddings" (
    "id" SERIAL NOT NULL,
    "wedding_title" TEXT NOT NULL,
    "wedding_date" TEXT NOT NULL,
    "shipping_address" TEXT NOT NULL DEFAULT 'null',
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "weddings_pkey" PRIMARY KEY ("id")
);

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
    "gift_name" TEXT NOT NULL,
    "giftedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gifted_by_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset_token_storage" (
    "id" SERIAL NOT NULL,
    "requested_by" TEXT NOT NULL,
    "expiration_date" BIGINT NOT NULL,
    "used" BOOLEAN NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "password_reset_token_storage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_token_storage_token_key" ON "password_reset_token_storage"("token");

-- AddForeignKey
ALTER TABLE "weddings" ADD CONSTRAINT "weddings_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "password_reset_token_storage" ADD CONSTRAINT "password_reset_token_storage_requested_by_fkey" FOREIGN KEY ("requested_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
