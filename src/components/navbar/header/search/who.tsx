import useNavbarStore from "@/hooks/use-navbar-store";
import React from "react";
import { useShallow } from "zustand/shallow";
import styles from "./search.module.scss";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

export default function Who({
  isScrollOnStart,
  tabsContent,
}: {
  isScrollOnStart: boolean;
  tabsContent: string;
}) {
  const { isDropSearch, hover, setHover, click, setClick } = useNavbarStore(
    useShallow((state) => ({
      isDropSearch: state.isDropSearch,
      hover: state.hover,
      setHover: state.setHover,
      click: state.click,
      setClick: state.setClick,
    }))
  );

  return (
    <div
      className={`${styles.tabs_content_item} ${
        (isDropSearch || isScrollOnStart) && styles.active
      }`}>
      <div
        onMouseEnter={() => setHover("who")}
        onMouseLeave={() => setHover("")}
        onClick={() => setClick("who")}
        className={`${styles.filterItem} ${click === "who" && styles.click} ${
          (click === "checkout" || click === "date") && styles.hoverNeighborLeft
        } ${hover === "search" && styles.hover}`}>
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="text-[13px] font-medium">Who</div>
            <div
              className={`text-sm ${
                click.trim() && click !== "who" ? "text-foreground" : "text-muted-foreground"
              }`}>
              Add guests
            </div>
          </div>
          <Button
            onMouseEnter={(e) => {
              e.stopPropagation();
              setHover("search");
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setHover("");
            }}
            className={`${styles.searchButton} ${click.trim() && styles.click}`}>
            <SearchIcon strokeWidth={2.5} />
            {click.trim() && <span className="font-medium text-base">Search</span>}
          </Button>
        </div>
      </div>
      {tabsContent === "stays" ? <ContentStays /> : <ContentExperiences />}
    </div>
  );
}

const ContentStays = () => {
  const { click } = useNavbarStore(
    useShallow((state) => ({
      click: state.click,
    }))
  );

  return (
    click === "who" && (
      <div className="absolute left-0 w-full bg-background shadow-lg border rounded-3xl mt-3 p-4">
        ContentStays
      </div>
    )
  );
};

const ContentExperiences = () => {
  const { click } = useNavbarStore(
    useShallow((state) => ({
      click: state.click,
    }))
  );

  return (
    click === "who" && (
      <div className="absolute left-0 w-full bg-background shadow-lg border rounded-3xl mt-3 p-4">
        ContentExperiences
      </div>
    )
  );
};
