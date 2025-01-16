import React, { useState } from "react";
import { Button } from "../../../ui/button";
import styles from "./switch.module.scss";
import { Check } from "lucide-react";

export default function ToolbarSwitch() {
  const [isToggled, setIsToggled] = useState(false);

  const handleButtonClick = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <Button
      variant="outline"
      className="[&_svg]:size-4 hover:border-muted-foreground rounded-xl h-12 flex items-center justify-between px-4"
      onClick={handleButtonClick}>
      <span>Display total before taxes</span>
      <div
        className={`${styles.switch} ${
          isToggled ? "bg-foreground" : "bg-muted-foreground"
        }`}>
        <div
          className={`${styles.switch__circle} ${
            isToggled ? "translate-x-[15px]" : "translate-x-[3px]"
          }`}>
          {isToggled && <Check />}
        </div>
      </div>
    </Button>
  );
}
