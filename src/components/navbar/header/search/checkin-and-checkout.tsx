import React from "react";
import styles from "./search.module.scss";
import { Separator } from "@/components/ui/separator";
import { useShallow } from "zustand/shallow";
import useNavbarStore from "@/hooks/use-navbar-store";

export default function CheckinAndCheckout({ isScrollOnStart }: { isScrollOnStart: boolean }) {
  const { isDropSearch, hover, setHover, click, setClick } = useNavbarStore(
    useShallow((state) => ({
      isDropSearch: state.isDropSearch,
      hover: state.hover,
      setHover: state.setHover,
      click: state.click,
      setClick: state.setClick,
    }))
  );

  return (
    <div
      className={`${styles.tabs_content_item} ${
        (isDropSearch || isScrollOnStart) && styles.active
      }`}>
      <div className="flex items-center h-full">
        <div
          onMouseEnter={() => setHover("checkin")}
          onMouseLeave={() => setHover("")}
          onClick={() => setClick("checkin")}
          className={`${styles.filterItem} ${click === "checkin" && styles.click} ${
            click === "where" && styles.hoverNeighborLeft
          } ${click === "checkout" && styles.hoverNeighborRight}`}>
          <div>
            <div className="text-[13px] font-medium">Check in</div>
            <div
              className={`text-sm ${
                click.trim() && click !== "checkin" ? "text-foreground" : "text-muted-foreground"
              }`}>
              Add dates
            </div>
          </div>
        </div>
        <Separator
          orientation="vertical"
          className={`h-8 ${
            (click === "checkin" ||
              hover === "checkin" ||
              click === "checkout" ||
              hover === "checkout") &&
            "bg-transparent"
          }`}
        />
        <div
          onMouseEnter={() => setHover("checkout")}
          onMouseLeave={() => setHover("")}
          onClick={() => setClick("checkout")}
          className={`${styles.filterItem} ${click === "checkout" && styles.click} ${
            click === "checkin" && styles.hoverNeighborLeft
          } ${click === "who" && styles.hoverNeighborRight}`}>
          <div>
            <div className="text-[13px] font-medium">Check out</div>
            <div
              className={`text-sm ${
                click.trim() && click !== "checkout" ? "text-foreground" : "text-muted-foreground"
              }`}>
              Add dates
            </div>
          </div>
        </div>
      </div>
      {click === "checkin" && (
        <div className="absolute left-0 w-full bg-background shadow-lg border rounded-3xl mt-3 p-4">
          Checkin Stays
        </div>
      )}
      {click === "checkout" && (
        <div className="absolute left-0 w-full bg-background shadow-lg border rounded-3xl mt-3 p-4">
          checkout Stays
        </div>
      )}
    </div>
  );
}
