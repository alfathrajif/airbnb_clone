"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "./listings.module.scss";
import { ListingType } from "@/types";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import moment from "moment";
import { Button } from "./ui/button";

export default function Listings({ listings }: { listings: ListingType[] }) {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [imageWidth, setImageWidth] = useState<number | null>(null);

  const updateImageWidth = () => {
    if (imageRef.current) {
      setImageWidth(imageRef.current.clientWidth);
    }
  };

  useEffect(() => {
    // Update width on mount
    updateImageWidth();

    // Add event listener for window resize
    window.addEventListener("resize", updateImageWidth);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", updateImageWidth);
    };
  }, []);

  console.log(listings);

  return (
    <div className="py-2.5">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {listings.map(
            (
              { id, location, price_per_night, check_in_time, check_out_time, listing_photos },
              index
            ) => {
              const trimmedLocationText =
                location.length > 30 ? location.slice(0, location.lastIndexOf("and")) : location;

              const checkIn = () => {
                const formatDate = moment(check_in_time).format("l").split("/");

                return {
                  day: formatDate[1],
                  year: formatDate[2],
                  month: formatDate[0],
                };
              };

              const checkOut = () => {
                const formatDate = moment(check_in_time).format("l").split("/");

                return {
                  day: formatDate[1],
                  year: formatDate[2],
                  month: formatDate[0],
                };
              };

              const sameTime =
                checkIn().day === checkOut().day &&
                checkIn().year === checkOut().year &&
                checkIn().month === checkOut().month;

              return (
                <Link href={`/rooms/${id}`} key={index} className={styles.listing}>
                  <div
                    className={styles.listing__photo}
                    style={{ height: `${imageWidth}px` }}
                    ref={index === 0 ? imageRef : null}>
                    <Image
                      src={listing_photos[0].photo_url}
                      alt="photo"
                      height={500}
                      width={500}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 w-full flex items-center justify-between py-3 px-4">
                      {/* if guest favorite */}
                      <Button variant="outline" className="h-8 bg-background border-none shadow-sm">
                        Guest favorite
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="group hover:bg-transparent border-none -mr-1.5 [&_svg]:size-7">
                        <Heart className="group-hover:scale-105 fill-foreground/30 text-background drop-shadow-sm" />
                      </Button>
                    </div>
                  </div>
                  <div className="py-2">
                    <div className="font-medium text-[15px] flex justify-between items-start gap-x-5">
                      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {trimmedLocationText}
                      </div>
                      <div className="flex items-center gap-x-1">
                        <Star size={16} className="mb-0.5 fill-foreground" /> 4.75
                      </div>
                    </div>
                    <div className="text-[15px] text-muted-foreground">On Karon Beach</div>
                    {check_in_time && check_out_time && (
                      <div className="text-[15px] text-muted-foreground">
                        {checkIn().year !== checkOut().year
                          ? moment(check_in_time).format("ll")
                          : moment(check_in_time).format("ll").split(",")[0]}
                        {sameTime
                          ? ""
                          : ` - ${
                              checkIn().month === checkOut().month
                                ? moment(check_out_time).format("l").split("/")[1]
                                : checkOut().year !== checkIn().year
                                ? moment(check_out_time).format("ll")
                                : moment(check_out_time).format("ll").split(",")[0]
                            }`}
                      </div>
                    )}
                    <div>
                      <span className="font-medium">${price_per_night}</span>{" "}
                      <span className="font-light">night</span>
                    </div>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
