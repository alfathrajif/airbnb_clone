import React, { useState } from "react";
import styles from "./toolbar-filters.module.scss";
import { Button } from "@/components/ui/button";
import { amenities } from "@/constants";
import { iconMapping } from "@/constants/icon-mapping";
import { Amenity } from "@/types";
import { ChevronDown } from "lucide-react";

export default function Amenities() {
  const [activeAmenities, setActiveAmenities] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleAmenity = (name: string): void => {
    const lowercaseName = name.toLowerCase();
    setActiveAmenities((prev) =>
      prev.includes(lowercaseName)
        ? prev.filter((amenity) => amenity !== lowercaseName)
        : [...prev, lowercaseName]
    );
  };

  const toggleShowMore = () => setIsExpanded(!isExpanded);

  const renderAmenities = (filterType: string, showAll: boolean) => {
    return amenities
      .filter(({ type, isMain }) => type === filterType && (showAll || isMain))
      .map(({ icon, name }: Amenity, index: number) => {
        const Icon = iconMapping[icon];
        const lowerCaseName = name.toLowerCase();
        const isActive = activeAmenities.includes(lowerCaseName);
        return (
          <Button
            key={index}
            onClick={() => toggleAmenity(name)}
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
      });
  };

  return (
    <div className={styles.item}>
      <div className={styles.item__title}>Amenities</div>
      <div className="space-y-6 mt-1">
        <div>
          {isExpanded && <div className="font-medium mb-4">Essentials</div>}
          <div className="flex flex-wrap gap-x-3 gap-y-4">
            {renderAmenities("essentials", isExpanded)}
          </div>
        </div>
        {isExpanded && (
          <>
            <div>
              {isExpanded && <div className="font-medium mb-4">Features</div>}
              <div className="flex flex-wrap gap-x-3 gap-y-4">
                {renderAmenities("features", true)}
              </div>
            </div>
            <div>
              {isExpanded && <div className="font-medium mb-4">Location</div>}
              <div className="flex flex-wrap gap-x-3 gap-y-4">
                {renderAmenities("location", true)}
              </div>
            </div>
            <div>
              {isExpanded && <div className="font-medium mb-4">Safety</div>}
              <div className="flex flex-wrap gap-x-3 gap-y-4">
                {renderAmenities("safety", true)}
              </div>
            </div>
          </>
        )}
      </div>
      <button
        onClick={toggleShowMore}
        className="text-left font-medium underline flex items-end text-foreground/90 hover:text-foreground">
        {isExpanded ? "Show less" : "Show more"}
        <ChevronDown
          className={`${isExpanded ? "rotate-180 pb-1" : "pt-1"}`}
          size={26}
        />
      </button>
    </div>
  );
}
