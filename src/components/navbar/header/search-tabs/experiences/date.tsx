import styles from "../search-tabs.module.scss";
import React from "react";

interface DateProps {
  isClicked: number | null;
  hasDropdown: boolean;
  handleMouseEnter: (value: number) => void;
  handleMouseLeave: () => void;
  handleActiveDropdown: (value: number) => void;
}

export default function Date({
  isClicked,
  hasDropdown,
  handleMouseEnter,
  handleMouseLeave,
  handleActiveDropdown,
}: DateProps) {
  return (
    <div
      onClick={() => handleActiveDropdown(5)}
      onMouseEnter={() => handleMouseEnter(5)}
      onMouseLeave={() => handleMouseLeave}
      className={`${styles.check} ${
        isClicked === 1
          ? styles.onNeighbor_left
          : isClicked === 4
          ? styles.onNeighbor_right
          : isClicked === 5
          ? styles.onClick
          : hasDropdown && styles.onDropdown
      }`}>
      <div className={styles.check__button}>
        <div className="text-[13px] font-medium">Date</div>
        <div
          className={`text-sm ${
            isClicked && isClicked !== 5 ? "text-foreground" : "text-muted-foreground"
          }`}>
          Add dates
        </div>
      </div>
      {isClicked === 5 && <div className={styles.check__dropdown}>ss</div>}
    </div>
  );
}
