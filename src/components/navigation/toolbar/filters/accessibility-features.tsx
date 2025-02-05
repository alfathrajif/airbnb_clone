import { Checkbox } from "@/components/ui/checkbox";
import { accessibilityFeatures } from "@/constants";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

export default function AccessibilityFeatures() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { guestEntranceAndParking, bedroom, bathroom, adaptiveEquipment } =
    accessibilityFeatures;

  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    setCheckedIds((prev) =>
      isChecked ? [...prev, id] : prev.filter((checkedId) => checkedId !== id)
    );
  };

  return (
    <div className="py-4">
      <div
        onClick={() => setIsExpanded((prev) => !prev)}
        className="cursor-pointer flex items-center justify-between py-4">
        <div className="text-lg font-medium">Accessibility features</div>
        <ChevronDown
          className={`${isExpanded ? "rotate-180 pb-1" : "pt-1"}`}
          size={26}
        />
      </div>
      {isExpanded && (
        <>
          <div className="pb-6">
            <div className="font-normal text-lg mb-4">
              Guest entrance and parking
            </div>
            <div className="space-y-4">
              {bedroom.map(({ id, label }, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-5 cursor-pointer">
                  <Checkbox
                    id={id}
                    checked={checkedIds.includes(id)}
                    onCheckedChange={(isChecked: boolean) =>
                      handleCheckboxChange(id, isChecked)
                    }
                  />
                  <label
                    htmlFor={id}
                    className="text-lg w-full font-light cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="pb-6">
            <div className="font-normal text-lg mb-4">Bedroom</div>
            <div className="space-y-4">
              {guestEntranceAndParking.map(({ id, label }, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-5 cursor-pointer">
                  <Checkbox
                    id={id}
                    checked={checkedIds.includes(id)}
                    onCheckedChange={(isChecked: boolean) =>
                      handleCheckboxChange(id, isChecked)
                    }
                  />
                  <label
                    htmlFor={id}
                    className="text-lg w-full font-light cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="pb-6">
            <div className="font-normal text-lg mb-4">Bathroom</div>
            <div className="space-y-4">
              {bathroom.map(({ id, label }, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-5 cursor-pointer">
                  <Checkbox
                    id={id}
                    checked={checkedIds.includes(id)}
                    onCheckedChange={(isChecked: boolean) =>
                      handleCheckboxChange(id, isChecked)
                    }
                  />
                  <label
                    htmlFor={id}
                    className="text-lg w-full font-light cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="pb-6">
            <div className="font-normal text-lg mb-4">Adaptive Equipment</div>
            <div className="space-y-4">
              {adaptiveEquipment.map(({ id, label }, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-5 cursor-pointer">
                  <Checkbox
                    id={id}
                    checked={checkedIds.includes(id)}
                    onCheckedChange={(isChecked: boolean) =>
                      handleCheckboxChange(id, isChecked)
                    }
                  />
                  <label
                    htmlFor={id}
                    className="text-lg w-full font-light cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
