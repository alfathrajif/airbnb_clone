import { Checkbox } from "@/components/ui/checkbox";
import { hostLanguages } from "@/constants";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

export default function HostLanguage() {
  const [isExpanded, setIsExpanded] = useState(true);
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
        <div className="text-lg font-medium">Host language</div>
        <ChevronDown
          className={`${isExpanded ? "rotate-180 pb-1" : "pt-1"}`}
          size={26}
        />
      </div>
      {isExpanded && (
        <div className="grid grid-cols-2 gap-y-4 pb-8">
          {hostLanguages.map(({ id, label }, index) => (
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
      )}
    </div>
  );
}
