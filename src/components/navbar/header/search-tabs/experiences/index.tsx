import styles from "../search-tabs.module.scss";
import { TabsContent } from "@/components/ui/tabs";
import useNavbarStore from "@/hooks/use-navbar-store";
import React from "react";
import { useShallow } from "zustand/shallow";
import SearchWhere from "../search-where";
import { Separator } from "@/components/ui/separator";
import Date from "./date";
import SearchWho from "../search-who";
import useSearchTabsStore from "@/hooks/use-tabs-search-store";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

interface ExperiencesProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function Experiences({ containerRef }: ExperiencesProps) {
  const { isScrolled } = useNavbarStore(
    useShallow((state) => ({
      isScrolled: state.isScrolled,
    }))
  );

  const {
    isHovered,
    isClicked,
    isSearch,
    hasDropdown,
    handleActiveDropdown,
    handleMouseEnter,
    handleMouseLeave,
  } = useSearchTabsStore(
    useShallow((state) => ({
      isHovered: state.isHovered,
      isClicked: state.isClicked,
      isSearch: state.isSearch,
      hasDropdown: state.hasDropdown,
      handleActiveDropdown: state.handleActiveDropdown,
      handleMouseEnter: state.handleMouseEnter,
      handleMouseLeave: state.handleMouseLeave,
    }))
  );

  return (
    <>
      <TabsContent
        value="experiences"
        className={`${styles.search__input__wrapper} ${isScrolled && styles.scrolled}`}>
        <div
          ref={containerRef}
          className={`${styles.search__container} ${hasDropdown && styles.onDropdown}`}>
          {isScrolled > 0 ? (
            <div className="flex items-center justify-between w-full px-1.5 h-full cursor-pointer">
              <div className="w-full text-center">
                <div className="text-[15px] font-medium">Anywhere</div>
              </div>
              <Separator className="h-6" orientation="vertical" />
              <div className="w-full text-center">
                <div className="text-[15px] font-medium">Any week</div>
              </div>
              <Separator className="h-6" orientation="vertical" />
              <div className="w-full text-center">
                <div className="text-[15px] text-muted-foreground">Add guests</div>
              </div>
              <div>
                <Button size="icon" className="w-9 h-9 hover:brightness-100">
                  <SearchIcon strokeWidth={2.5} />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <SearchWhere
                isClicked={isClicked}
                hasDropdown={hasDropdown}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleActiveDropdown={handleActiveDropdown}
              />
              <Separator
                className={`h-9 ${
                  (isHovered === 1 || isHovered === 5 || isClicked === 1 || isClicked === 5) &&
                  "bg-transparent"
                }`}
                orientation="vertical"
              />
              <Date
                isClicked={isClicked}
                hasDropdown={hasDropdown}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleActiveDropdown={handleActiveDropdown}
              />
              <Separator
                className={`h-9 ${
                  (isHovered === 5 || isHovered === 4 || isClicked === 5 || isClicked === 4) &&
                  "bg-transparent"
                } ${isSearch && isClicked !== 4 && isClicked !== 5 && "bg-border"}`}
                orientation="vertical"
              />
              <SearchWho
                isClicked={isClicked}
                hasDropdown={hasDropdown}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleActiveDropdown={handleActiveDropdown}
              />
            </>
          )}
        </div>
      </TabsContent>
    </>
  );
}
