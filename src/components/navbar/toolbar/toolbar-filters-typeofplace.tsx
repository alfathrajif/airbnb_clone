import React, { useState } from "react";
import styles from "./toolbar-filters.module.scss";
import { Button } from "@/components/ui/button";

export default function TypeofPlace() {
  const options: string[] = ["Any type", "Room", "Entire home"];

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(options[activeIndex]);

  // Calculate the position of the active indicator based on the index
  const calculatePosition = (index: number) => {
    const baseOffset = index === 0 ? 4 : index === 1 ? -5 : -14;
    return `calc(${index} * (100% / ${options.length}) + ${baseOffset}px)`;
  };

  const handleOptionClick = (index: number) => {
    setActiveIndex(index);
    setSelectedOption(options[index]);
  };

  return (
    <div className={styles.item}>
      <div className={styles.item__title}>Type of Place</div>
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

            const baseLeftPosition =
              index === 1
                ? `left-[calc(100%/${options.length}-9px)]`
                : `left-[calc((100%/${options.length}-9px)*${index})]`;

            const activePositionOffset =
              index === 0
                ? "[2px]"
                : index === 1
                ? `[calc(100%/${options.length}-7px)]`
                : `[calc((100%/${options.length}-8px)*2)]`;

            return (
              <Button
                key={index}
                variant="ghost"
                onClick={() => handleOptionClick(index)}
                className={`hover:bg-accent absolute ease-in-out hover:z-10 ${baseLeftPosition} w-[calc(100%/${
                  options.length
                }+10px)] h-[calc(3.5rem-10px)] rounded-xl ${
                  isActive
                    ? `bg-background z-20 w-[calc(100%/${options.length}+6px)] h-[calc(3.5rem-14px)] top-[2px] left-${activePositionOffset}`
                    : ""
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
