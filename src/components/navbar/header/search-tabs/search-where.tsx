import React from "react";
import styles from "./search-tabs.module.scss";
import { Input } from "@/components/ui/input";

interface SearchWhereProps {
  isClicked: number | null;
  hasDropdown: boolean;
  handleMouseEnter: (value: number) => void;
  handleMouseLeave: () => void;
  handleActiveDropdown: (value: number) => void;
}

export default function SearchWhere({
  isClicked,
  hasDropdown,
  handleMouseEnter,
  handleMouseLeave,
  handleActiveDropdown,
}: SearchWhereProps) {
  return (
    <div className={styles.where}>
      <div
        onMouseEnter={() => handleMouseEnter(1)}
        onMouseLeave={() => handleMouseLeave}
        className={`${styles.where__wrapper} ${
          isClicked === 2 || isClicked === 5
            ? styles.onNeighbor_right
            : isClicked === 1
            ? styles.onClick
            : hasDropdown && styles.onDropdown
        }`}>
        <label className="cursor-pointer">
          <div className="flex flex-col h-full justify-center px-9">
            <div className="text-[13px] font-medium">Where</div>
            <Input
              onFocus={() => handleActiveDropdown(1)}
              className={`text-sm border-none ${
                hasDropdown && isClicked !== 1
                  ? "placeholder:text-foreground"
                  : "placeholder:text-muted-foreground"
              } p-0 h-auto shadow-none`}
              placeholder="Search destinations"
            />
          </div>
        </label>
        {isClicked === 1 && <div className={styles.where__dropdown}>asdasd</div>}
      </div>
    </div>
  );
}
