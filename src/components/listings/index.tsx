"use client";
import { ListingType } from "@/types";
import { Star } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import styles from "./listings.module.scss";
import { Button } from "../ui/button";
import Wishlist from "./wishlist";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

export default function Listings({ listings }: { listings: ListingType[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [showPaginationIndex, setShowPaginationIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

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
                <div key={index} className="relative">
                  <Wishlist />
                  <Carousel
                    setApi={setApi}
                    onMouseEnter={() => setShowPaginationIndex(index)}
                    onMouseLeave={() => setShowPaginationIndex(null)}>
                    <div className={styles.listing__photo}>
                      <Link href={`/rooms/${id}`} className={styles.listing}>
                        <Button
                          variant="outline"
                          className="absolute z-10 left-4 top-3 hover:bg-background h-8 bg-background border-none shadow-sm">
                          Guest favorite
                        </Button>
                        <CarouselContent>
                          {listing_photos.map(({ photo_url }, index) => (
                            <CarouselItem key={index}>
                              <Image
                                key={index}
                                src={photo_url}
                                alt="photo"
                                height={500}
                                width={500}
                                priority
                                className="w-full h-full object-cover"
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <div className="py-2 text-center text-sm text-muted-foreground">
                          Slide {current} of {count}
                        </div>
                      </Link>
                      {showPaginationIndex === index && (
                        <>
                          <CarouselPrevious />
                          <CarouselNext />
                        </>
                      )}
                    </div>
                    <div>
                      <Link href={`/rooms/${id}`} className="pt-2 pb-1 block">
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
                      </Link>
                      <div>
                        <span className="font-medium">${price_per_night}</span>{" "}
                        <span className="font-light">night</span>
                      </div>
                    </div>
                  </Carousel>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
