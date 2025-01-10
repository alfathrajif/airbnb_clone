import React, { useState } from "react";
import styles from "./toolbar-filters.module.scss";
import { Button } from "@/components/ui/button";

export default function TypeofPlace() {
  const options = ["Any type", "Room", "Entire home"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(options[activeIndex]);

  // Calculate the position of the active indicator based on the index
  const calculatePosition = (index: number) => {
    const baseOffsets = [4, -5, -14];
    return `calc(${index} * (100% / 3) + ${baseOffsets[index]}px)`;
  };

  const handleOptionClick = (index: number) => {
    setActiveIndex(index);
    setSelectedOption(options[index]);
  };

  console.log(selectedOption);

  return (
    <div className={styles.item}>
      <div className={styles.item__title}>Type of Place</div>
      {/* Container for the filter buttons */}
      <div className="relative border rounded-2xl flex p-1 h-14 mb-1.5">
        <div
          className={`absolute z-30 cursor-pointer h-[calc(100%-8px)] rounded-xl border-2 border-foreground ease-out duration-100`}
          style={{
            left: calculatePosition(activeIndex),
            width: `calc((100% / ${options.length}) + 10px)`,
          }}
        />
        <div className="absolute w-full">
          {options.map((option, index) => {
            const isActive = activeIndex === index;

            const baseLeftPosition = [
              "left-0",
              "left-[calc(100%/3-9px)]",
              "left-[calc((100%/3-9px)*2)]",
            ];

            const activePositionOffset =
              index === 0
                ? "left-[2px]"
                : index === 1
                ? `left-[calc(100%/3-7px)]`
                : `left-[calc((100%/3-8px)*2)]`;

            return (
              <Button
                key={index}
                variant="ghost"
                onClick={() => handleOptionClick(index)}
                className={`absolute rounded-xl ${baseLeftPosition[index]} ${
                  isActive
                    ? `bg-background z-20 w-[calc(100%/3+6px)] h-[calc(3.5rem-14px)] top-[2px] ${activePositionOffset}`
                    : "w-[calc(100%/3+10px)] h-[calc(3.5rem-10px)] hover:z-10"
                }`}>
                {option}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
