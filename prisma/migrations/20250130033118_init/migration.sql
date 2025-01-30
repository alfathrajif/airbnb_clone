/*
  Warnings:

  - You are about to drop the `ListingPhotos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ListingPhotos" DROP CONSTRAINT "ListingPhotos_listing_id_fkey";

-- DropTable
DROP TABLE "ListingPhotos";

-- CreateTable
CREATE TABLE "listing_photos" (
    "id" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "listing_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listing_photos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "listing_photos" ADD CONSTRAINT "listing_photos_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
