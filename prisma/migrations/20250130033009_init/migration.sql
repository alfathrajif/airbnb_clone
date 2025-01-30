-- AlterTable
ALTER TABLE "listings" ALTER COLUMN "cancellation_policy" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ListingPhotos" (
    "id" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "listing_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ListingPhotos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ListingPhotos" ADD CONSTRAINT "ListingPhotos_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
