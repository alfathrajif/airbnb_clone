import React, { useState } from "react";
import styles from "./toolbar-filters.module.scss";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface CounterProps {
  label: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  maxLimit: number;
}

const Counter: React.FC<CounterProps> = ({
  label,
  count,
  onIncrement,
  onDecrement,
  maxLimit,
}) => (
  <div className="flex justify-between items-center">
    <div>{label}</div>
    <div className="grid grid-cols-3 gap-5 items-center">
      <Button
        size="icon"
        variant="outline"
        className={`text-foreground/60 hover:border-muted-foreground ${
          count === 0 && "pointer-events-none opacity-0 text-foreground/40"
        }`}
        disabled={count === 0}
        onClick={onDecrement}>
        <Minus />
      </Button>
      <div className="text-center">{count === 0 ? "Any" : `${count}+`}</div>
      <Button
        size="icon"
        variant="outline"
        className={`text-foreground/60 hover:border-muted-foreground ${
          count === maxLimit &&
          "pointer-events-none opacity-0 text-foreground/40"
        }`}
        disabled={count === maxLimit}
        onClick={onIncrement}>
        <Plus />
      </Button>
    </div>
  </div>
);

export default function RoomsAndBeds() {
  const [counterBedrooms, setCounterBedrooms] = useState(0);
  const [counterBeds, setCounterBeds] = useState(0);
  const [counterBathrooms, setCounterBathrooms] = useState(0);
  const maxLimit = 8;

  const handleIncrement = (
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setter((prev) => Math.min(prev + 1, maxLimit));
  };

  const handleDecrement = (
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setter((prev) => Math.max(prev - 1, 0));
  };

  console.log(counterBedrooms, counterBeds, counterBathrooms);

  return (
    <div className={styles.item}>
      <div className={styles.item__title}>Rooms and Beds</div>
      <div className="space-y-5">
        <Counter
          label="Bedrooms"
          count={counterBedrooms}
          maxLimit={maxLimit}
          onIncrement={() => handleIncrement(setCounterBedrooms)}
          onDecrement={() => handleDecrement(setCounterBedrooms)}
        />
        <Counter
          label="Beds"
          count={counterBeds}
          maxLimit={maxLimit}
          onIncrement={() => handleIncrement(setCounterBeds)}
          onDecrement={() => handleDecrement(setCounterBeds)}
        />
        <Counter
          label="Bathrooms"
          count={counterBathrooms}
          maxLimit={maxLimit}
          onIncrement={() => handleIncrement(setCounterBathrooms)}
          onDecrement={() => handleDecrement(setCounterBathrooms)}
        />
      </div>
    </div>
  );
}
