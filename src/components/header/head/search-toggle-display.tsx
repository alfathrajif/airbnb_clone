import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useNavbarStore from "@/hooks/use-navbar-store";
import { Search } from "lucide-react";
import { useShallow } from "zustand/shallow";
import styles from "../header.module.scss";
import { MutableRefObject } from "react";

const Display = ({
  initialScrollY,
  isScrollOnStart,
}: {
  initialScrollY: MutableRefObject<number>;
  isScrollOnStart: boolean;
}) => {
  const { isDropSearch, setIsDropSearch, setHover, setClick, activeTab } = useNavbarStore(
    useShallow((state) => ({
      isDropSearch: state.isDropSearch,
      setIsDropSearch: state.setIsDropSearch,
      setHover: state.setHover,
      setClick: state.setClick,
      activeTab: state.activeTab,
    }))
  );

  const handleDropdownSearch = () => {
    initialScrollY.current = window.scrollY;
    setIsDropSearch(true);
  };

  const handleButtonClick = (e: React.MouseEvent, hoverValue: string, clickValue: string) => {
    e.stopPropagation();
    initialScrollY.current = window.scrollY;
    setIsDropSearch(true);
    setHover(hoverValue);
    setClick(clickValue);
  };

  return (
    <div
      onClick={handleDropdownSearch}
      className={`${styles.toggleSearch} ${(isDropSearch || isScrollOnStart) && styles.active}`}>
      <div className="w-full">
        <Button
          onClick={(e) => handleButtonClick(e, "where", "where")}
          variant="ghost"
          className={`rounded-r-none ${styles.button} ${
            (isDropSearch || isScrollOnStart) && styles.active
          }`}>
          Anywhere
        </Button>
      </div>
      <Separator orientation="vertical" className="h-6" />
      <div className="w-full">
        <Button
          onClick={(e) =>
            handleButtonClick(
              e,
              activeTab === "stays" ? "checkin" : "date",
              activeTab === "stays" ? "checkin" : "date"
            )
          }
          variant="ghost"
          className={`rounded-none ${styles.button} ${
            (isDropSearch || isScrollOnStart) && styles.active
          }`}>
          Any week
        </Button>
      </div>
      <Separator orientation="vertical" className="h-6" />
      <div className="w-full flex items-center">
        <Button
          onClick={(e) => handleButtonClick(e, "who", "who")}
          variant="ghost"
          className={`rounded-none text-muted-foreground hover:text-muted-foreground ${
            styles.button
          } ${(isDropSearch || isScrollOnStart) && styles.active}`}>
          Add guests
        </Button>
        <div
          className={`${styles.button_search} ${
            (isDropSearch || isScrollOnStart) && styles.active
          }`}>
          <Search size={17} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};

const Backdrop = () => {
  const { isDropSearch } = useNavbarStore(
    useShallow((state) => ({
      isDropSearch: state.isDropSearch,
    }))
  );

  return (
    <div
      className={`fixed bg-foreground/20 top-0 left-0 w-full h-full transition-opacity duration-200 opacity-0 ${
        isDropSearch && "opacity-100"
      }`}
    />
  );
};

export const SearchToggle = {
  Display,
  Backdrop,
};
