import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SlidersHorizontal, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import TypeofPlace from "./typeofplace";
import RoomsAndBeds from "./rooms-and-beds";
import Amenities from "./amenities";
import BookingOptions from "./booking-options";
import StandoutStays from "./standout-stays";
import PriceRange from "./price-range";
import filtersStyles from "./filters.module.scss";
import { Button } from "@/components/ui/button";
import PropertyType from "./property-type";
import AccessibilityFeatures from "./accessibility-features";
import HostLanguage from "./host-language";

export default function ToolbarFilters() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="hover:border-muted-foreground rounded-xl h-12">
            <SlidersHorizontal />
            Filters
          </Button>
        </DialogTrigger>
        <DialogContent className={filtersStyles.filters__content}>
          <DialogHeader className="p-6 border-b space-y-0 relative">
            <Button
              onClick={() => setOpen(false)}
              size="icon"
              variant="ghost"
              className="absolute left-4 top-1/2 -translate-y-1/2 [&_svg]:size-5">
              <X />
            </Button>
            <DialogTitle className="text-center font-semibold">
              Filters
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className={filtersStyles.filters__content__body}>
            <TypeofPlace />
            <Separator />
            <PriceRange />
            <Separator />
            <RoomsAndBeds />
            <Separator />
            <Amenities />
            <Separator />
            <BookingOptions />
            <Separator />
            <StandoutStays />
            <Separator />
            <PropertyType />
            <Separator />
            <AccessibilityFeatures />
            <Separator />
            <HostLanguage />
          </div>
          <DialogFooter className={filtersStyles.filters__content__footer}>
            <Button
              variant="ghost"
              className="rounded-lg font-semibold text-base px-3 h-12">
              Clear all
            </Button>
            <Button className="bg-foreground text-base font-semibold rounded-lg px-6 h-12">
              Show 1,000+ places
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
