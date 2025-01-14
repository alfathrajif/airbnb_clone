import React, { useState } from "react";
import filtersStyles from "./filters.module.scss";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function StandoutStays() {
  const [activeStandoutStays, setActiveStandoutStays] = useState(false);

  const toggleStandoutStays = () => {
    setActiveStandoutStays((prev) => !prev);
  };

  return (
    <div className={filtersStyles.item}>
      <div className={filtersStyles.item__title}>Standout stays</div>
      <Button
        onClick={toggleStandoutStays}
        variant="outline"
        className={`py-3.5 px-6 font-normal h-auto items-start gap-x-4 rounded-xl w-fit border-none active:scale-95 transition-all duration-100 [&_svg]:size-7 ${
          activeStandoutStays
            ? "ring-2 ring-foreground bg-accent"
            : "ring-1 ring-border hover:bg-background hover:ring-foreground"
        }`}>
        <Star className="-ml-1 mt-1" />
        <div className="text-left whitespace-normal">
          <div className="text-base font-medium mb-0.5">Guesy favorite</div>
          <div className="text-sm text-muted-foreground">
            The most loved homes
            <br />
            on Airbnb
          </div>
        </div>
      </Button>
    </div>
  );
}
