import { Button } from "@/components/ui/button";
import styles from "./search-tabs.module.scss";
import React from "react";
import { SearchIcon } from "lucide-react";
import { useShallow } from "zustand/shallow";
import useSearchTabsStore from "@/hooks/use-tabs-search-store";

interface SearchWhoProps {
  isClicked: number | null;
  hasDropdown: boolean;
  handleMouseEnter: (value: number) => void;
  handleMouseLeave: () => void;
  handleActiveDropdown: (value: number) => void;
}

export default function SearchWho({
  isClicked,
  hasDropdown,
  handleMouseEnter,
  handleMouseLeave,
  handleActiveDropdown,
}: SearchWhoProps) {
  const { isSearch, setIsSearch } = useSearchTabsStore(
    useShallow((state) => ({
      isSearch: state.isSearch,
      setIsSearch: state.setIsSearch,
    }))
  );

  return (
    <div className={styles.who}>
      <div
        onClick={() => handleActiveDropdown(4)}
        onMouseEnter={() => handleMouseEnter(4)}
        onMouseLeave={() => handleMouseLeave}
        className={`${styles.who__wrapper} ${
          isClicked === 3 || isClicked === 5
            ? (isSearch && styles.onNeighbor_left_onSearch) || styles.onNeighbor_left
            : isClicked === 4
            ? styles.onClick
            : hasDropdown && styles.onDropdown
        } ${isSearch && styles.onSearch}`}>
        <div className={`${styles.who__container}`}>
          <div className={`${styles.who__button} `}>
            <div className="text-[13px] font-medium">Who</div>
            <div
              className={`text-sm ${
                isClicked && isClicked !== 4 ? "text-foreground" : "text-muted-foreground"
              }`}>
              Add quests
            </div>
          </div>
          <div className="w-fit m-2">
            <Button
              onMouseEnter={(e) => {
                e.stopPropagation();
                setIsSearch(true);
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                setIsSearch(false);
              }}
              onClick={(e) => {
                e.stopPropagation();
                console.log("search");
              }}
              size="icon"
              className={`h-12 [&_svg]:size-5 ${
                hasDropdown ? "w-fit <gap-x-2></gap-x-2> px-4" : "w-12"
              }`}>
              <SearchIcon strokeWidth={2.5} />
              {hasDropdown && <span className="font-medium">Search</span>}
            </Button>
          </div>
        </div>
      </div>
      {isClicked === 4 && (
        <div className={styles.who__dropdown}>who whowhowhowhowhowhowhowhowhowho</div>
      )}
    </div>
  );
}
