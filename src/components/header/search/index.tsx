import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useNavbarStore from "@/hooks/use-navbar-store";
import { RefObject } from "react";
import { useShallow } from "zustand/shallow";
import CheckinAndCheckout from "./checkin-and-checkout";
import styles from "./index.module.scss";
import Where from "./where";
import Who from "./who";
import Date from "./date";

interface SearchProps {
  tabsContentRef: RefObject<HTMLDivElement | null>;
  isScrollOnStart: boolean;
}

export default function Search({ tabsContentRef, isScrollOnStart }: SearchProps) {
  const { isDropSearch, hover, click, setActiveTab } = useNavbarStore(
    useShallow((state) => ({
      isDropSearch: state.isDropSearch,
      hover: state.hover,
      setHover: state.setHover,
      click: state.click,
      setClick: state.setClick,
      setActiveTab: state.setActiveTab,
    }))
  );

  return (
    <div className={`${styles.search} ${(isDropSearch || isScrollOnStart) && styles.active}`}>
      <Tabs
        onValueChange={setActiveTab}
        defaultValue="stays"
        className={`${styles.tabs} ${(isDropSearch || isScrollOnStart) && styles.active}`}>
        <TabsList className="flex h-20 w-fit mx-auto">
          <TabsTrigger value="stays" className="text-base">
            Stays
          </TabsTrigger>
          <TabsTrigger value="experiences" className="text-base">
            Experiences
          </TabsTrigger>
        </TabsList>
        <div
          ref={tabsContentRef}
          className={`${styles.tabs_content} ${click.trim() && styles.click}`}>
          {/* stays */}

          <TabsContent value="stays">
            <div className="flex items-center">
              <Where isScrollOnStart={isScrollOnStart} tabsContent="stays" />
              <Separator
                orientation="vertical"
                className={`h-8 ${
                  (click === "where" ||
                    hover === "where" ||
                    click === "checkin" ||
                    hover === "checkin" ||
                    click === "when" ||
                    hover === "when") &&
                  "bg-transparent"
                }`}
              />
              <CheckinAndCheckout isScrollOnStart={isScrollOnStart} />
              <Separator
                orientation="vertical"
                className={`h-8 ${
                  (click === "checkout" ||
                    hover === "checkout" ||
                    click === "who" ||
                    hover === "who" ||
                    click === "when" ||
                    hover === "when") &&
                  "bg-transparent"
                }`}
              />
              <Who isScrollOnStart={isScrollOnStart} tabsContent="stays" />
            </div>
          </TabsContent>

          {/* experiences */}
          <TabsContent value="experiences">
            <div className="flex items-center">
              <Where isScrollOnStart={isScrollOnStart} tabsContent="experiences" />
              <Separator
                orientation="vertical"
                className={`h-8 ${
                  (click === "where" ||
                    click === "date" ||
                    hover === "where" ||
                    hover === "date") &&
                  "bg-transparent"
                }`}
              />
              <Date isScrollOnStart={isScrollOnStart} />
              <Separator
                orientation="vertical"
                className={`h-8 ${
                  (click === "date" ||
                    hover === "date" ||
                    click === "when" ||
                    hover === "when" ||
                    click === "who" ||
                    hover === "who") &&
                  "bg-transparent"
                }`}
              />
              <Who isScrollOnStart={isScrollOnStart} tabsContent="experiences" />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
