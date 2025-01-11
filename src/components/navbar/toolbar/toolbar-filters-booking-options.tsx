import React, { useState } from "react";
import styles from "./toolbar-filters.module.scss";
import { Button } from "@/components/ui/button";
import { BookingOption } from "@/types";
import { iconMapping } from "@/constants/icon-mapping";
import { bookingOptions } from "@/constants";

export default function BookingOptions() {
  const [activeBookingOptions, setActiveBookingOptions] = useState<string[]>(
    []
  );

  const toggleBookingOption = (name: string): void => {
    const lowercaseName = name.toLowerCase();
    setActiveBookingOptions((prev) =>
      prev.includes(lowercaseName)
        ? prev.filter((bookingOption) => bookingOption !== lowercaseName)
        : [...prev, lowercaseName]
    );
  };

  const renderBookingOptions = () => {
    return bookingOptions.map(
      ({ icon, name }: BookingOption, index: number) => {
        const Icon = iconMapping[icon];
        const lowerCaseName = name.toLowerCase();
        const isActive = activeBookingOptions.includes(lowerCaseName);
        return (
          <Button
            key={index}
            onClick={() => toggleBookingOption(name)}
            variant="outline"
            className={`p-5 font-normal border-none active:scale-95 transition-all duration-100 [&_svg]:size-5 ${
              isActive
                ? "ring-2 ring-foreground bg-accent"
                : "ring-1 ring-border hover:bg-background hover:ring-foreground"
            }`}>
            <Icon />
            {name}
          </Button>
        );
      }
    );
  };

  return (
    <div className={styles.item}>
      <div className={styles.item__title}>Booking options</div>
      <div className="flex flex-wrap gap-x-3 gap-y-4">
        {renderBookingOptions()}
      </div>
    </div>
  );
}
