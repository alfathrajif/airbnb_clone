import useNavbarStore from "@/hooks/use-navbar-store";
import styles from "./search.module.scss";
import React from "react";
import { useShallow } from "zustand/shallow";

export default function Date({ isScrollOnStart }: { isScrollOnStart: boolean }) {
  const { isDropSearch, setHover, click, setClick } = useNavbarStore(
    useShallow((state) => ({
      isDropSearch: state.isDropSearch,
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
      <div
        onMouseEnter={() => setHover("date")}
        onMouseLeave={() => setHover("")}
        onClick={() => setClick("date")}
        className={`${styles.filterItem} ${click === "date" && styles.click} ${
          click === "where" && styles.hoverNeighborLeft
        } ${click === "who" && styles.hoverNeighborRight}`}>
        <div>
          <div className="text-[13px] font-medium">Date</div>
          <div
            className={`text-sm ${
              click.trim() && click !== "date" ? "text-foreground" : "text-muted-foreground"
            }`}>
            Add dates
          </div>
        </div>
      </div>
      {/* date dropdown */}
      {click === "date" && (
        <div className="absolute left-0 w-full bg-background shadow-lg border rounded-3xl mt-3 p-4">
          Date experiences
        </div>
      )}
    </div>
  );
}
