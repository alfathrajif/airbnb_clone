import { Button } from "@/components/ui/button";
import { property_types } from "@/constants";
import { iconMapping } from "@/constants/icon-mapping";
import { PropertyTypeType } from "@/types";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

export default function PropertyType() {
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePropertyType = (name: string): void => {
    const lowercaseName = name.toLowerCase();
    setActiveTypes((prev) =>
      prev.includes(lowercaseName)
        ? prev.filter((type) => type !== lowercaseName)
        : [...prev, lowercaseName]
    );
  };

  return (
    <div className="py-2">
      <div
        onClick={() => setIsExpanded((prev) => !prev)}
        className="cursor-pointer flex items-center justify-between py-4">
        <div className="text-lg font-medium">Property Type</div>
        <ChevronDown
          className={`${isExpanded ? "rotate-180 pb-1" : "pt-1"}`}
          size={26}
        />
      </div>
      {isExpanded && (
        <div className="flex flex-wrap gap-x-3 gap-y-3.5 pb-6">
          {property_types.map(
            ({ icon, name }: PropertyTypeType, index: number) => {
              const Icon = iconMapping[icon];
              const lowerCaseName = name.toLowerCase();
              const isActive = activeTypes.includes(lowerCaseName);
              return (
                <Button
                  key={index}
                  onClick={() => togglePropertyType(name)}
                  variant="outline"
                  className={`p-5 font-normal border-none active:scale-95 transition-all duration-100 [&_svg]:size-5 ${
                    isActive
                      ? "ring-2 ring-foreground bg-accent"
                      : "ring-1 ring-border hover:bg-background hover:ring-foreground"
                  }`}>
                  <Icon />
                  {name}
                </Button>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}
