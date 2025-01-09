import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import styles from "./navbar-bottom-toolbar.module.scss";
import { SlidersHorizontal } from "lucide-react";

export default function NavbarBottomToolbar() {
  return (
    <div className="flex w-fit items-center gap-x-5 mb-1">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="rounded-xl h-12">
            <SlidersHorizontal />
            Filters
          </Button>
        </DialogTrigger>
        <DialogContent className={styles.filters__content}>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Button variant="outline" className="rounded-xl h-12">
        Display total before taxes
      </Button>
    </div>
  );
}
