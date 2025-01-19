import styles from "../search-tabs.module.scss";
import React from "react";

interface CheckoutProps {
  isClicked: number | null;
  hasDropdown: boolean;
  handleMouseEnter: (value: number) => void;
  handleMouseLeave: () => void;
  handleActiveDropdown: (value: number) => void;
}

export default function Checkout({
  isClicked,
  hasDropdown,
  handleMouseEnter,
  handleMouseLeave,
  handleActiveDropdown,
}: CheckoutProps) {
  return (
    <div
      onClick={() => handleActiveDropdown(3)}
      onMouseEnter={() => handleMouseEnter(3)}
      onMouseLeave={() => handleMouseLeave}
      className={`${styles.check} ${
        isClicked === 2
          ? styles.onNeighbor_left
          : isClicked === 4
          ? styles.onNeighbor_right
          : isClicked === 3
          ? styles.onClick
          : hasDropdown && styles.onDropdown
      }`}>
      <div className={styles.check__button}>
        <div className="text-[13px] font-medium">Check out</div>
        <div
          className={`text-sm ${
            isClicked && isClicked !== 3 ? "text-foreground" : "text-muted-foreground"
          }`}>
          Add dates
        </div>
      </div>
      {isClicked === 3 && (
        <div className={styles.check__dropdown}>
          Check outCheck outCheck outCheck outCheck outCheck outCheck out
        </div>
      )}
    </div>
  );
}
