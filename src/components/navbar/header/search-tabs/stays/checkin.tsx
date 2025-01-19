import styles from "../search-tabs.module.scss";
import React from "react";

interface CheckinProps {
  isClicked: number | null;
  hasDropdown: boolean;
  handleMouseEnter: (value: number) => void;
  handleMouseLeave: () => void;
  handleActiveDropdown: (value: number) => void;
}

export default function Checkin({
  isClicked,
  hasDropdown,
  handleMouseEnter,
  handleMouseLeave,
  handleActiveDropdown,
}: CheckinProps) {
  return (
    <div
      onClick={() => handleActiveDropdown(2)}
      onMouseEnter={() => handleMouseEnter(2)}
      onMouseLeave={() => handleMouseLeave}
      className={`${styles.check} ${
        isClicked === 1
          ? styles.onNeighbor_left
          : isClicked === 3
          ? styles.onNeighbor_right
          : isClicked === 2
          ? styles.onClick
          : hasDropdown && styles.onDropdown
      }`}>
      <div className={styles.check__button}>
        <div className="text-[13px] font-medium">Check in</div>
        <div
          className={`text-sm ${
            isClicked && isClicked !== 2 ? "text-foreground" : "text-muted-foreground"
          }`}>
          Add dates
        </div>
      </div>
      {isClicked === 2 && (
        <div className={styles.check__dropdown}>
          Check inCheck in Check in Check in Check in Check in Check in
        </div>
      )}
    </div>
  );
}
