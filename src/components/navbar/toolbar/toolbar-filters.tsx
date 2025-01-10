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
import { Button } from "../../ui/button";
import styles from "./toolbar-filters.module.scss";
import { SlidersHorizontal, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import TypeofPlace from "./toolbar-filters-typeofplace";

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
        <DialogContent className={styles.filters__content}>
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
          <div className={styles.filters__content__body}>
            <TypeofPlace />
            <Separator />
            <div className={styles.item}>
              <div className={styles.item__title}>Price Range</div>
            </div>
            <Separator />
            <div className={styles.item}>
              <div className={styles.item__title}>Rooms and Beds</div>
            </div>
            <Separator />
            <div className={styles.item}>
              <div className={styles.item__title}>Amenities</div>
            </div>
            <Separator />
            <div className={styles.item}>
              <div className={styles.item__title}>Booking options</div>
            </div>
            <Separator />
            <div className={styles.item}>
              <div className={styles.item__title}>Standout stays</div>
            </div>
            <Separator />
            <div>Property type</div>
            <Separator />
            <div>accessibility features</div>
            <Separator />
            <div>host language</div>
          </div>
          <DialogFooter className={styles.filters__content__footer}>
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
