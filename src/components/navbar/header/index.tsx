"use client";
import { Button } from "@/components/ui/button";
import styles from "./header.module.scss";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Brand from "./brand";
import LangAndRegion from "./lang-and-region";
import ProfileDropdown from "./profile-dropdown";
import useNavbarStore from "@/hooks/use-navbar-store";
import { useShallow } from "zustand/shallow";

export default function NavbarHeader() {
  const {
    isScrolled,
    setIsScrolled,
    isDropSearch,
    setIsDropSearch,
    hover,
    setHover,
    click,
    setClick,
    activeTab,
    setActiveTab,
  } = useNavbarStore(
    useShallow((state) => ({
      isScrolled: state.isScrolled,
      setIsScrolled: state.setIsScrolled,
      isDropSearch: state.isDropSearch,
      setIsDropSearch: state.setIsDropSearch,
      hover: state.hover,
      setHover: state.setHover,
      click: state.click,
      setClick: state.setClick,
      activeTab: state.activeTab,
      setActiveTab: state.setActiveTab,
    }))
  );

  const initialScrollY = useRef(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (headerRef.current && !headerRef.current.contains(target)) {
        setIsDropSearch(false);
      }

      if (
        tabsContentRef.current &&
        !tabsContentRef.current.contains(target) &&
        target instanceof Element &&
        !target.closest("button")
      ) {
        setHover("");
        setClick("");
      }
    };

    const handleScroll = () => setIsScrolled(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setClick, setHover, setIsDropSearch, setIsScrolled]);

  // close search when scrolled
  useEffect(() => {
    setIsScrolled(window.scrollY);
    const scrollDiff = Math.abs(isScrolled - initialScrollY.current);

    if (scrollDiff > 60) {
      setHover("");
      setClick("");
      if (isDropSearch) setIsDropSearch(false);
    }
  }, [isScrolled, isDropSearch, setIsScrolled, setIsDropSearch, setHover, setClick]);

  useEffect(() => {
    if (click.trim() && click !== "where") {
      setHover("");
      setClick("on");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleDropdownSearch = () => {
    initialScrollY.current = window.scrollY;
    setIsDropSearch(true);
  };

  const fixDropSearch = isDropSearch && isScrolled > 0;
  const startDropSearch = isScrolled === 0;

  const handleButtonClick = (e: React.MouseEvent, hoverValue: string, clickValue: string) => {
    e.stopPropagation();
    initialScrollY.current = window.scrollY;
    setIsDropSearch(true);
    setHover(hoverValue);
    setClick(clickValue);
  };

  return (
    <>
      <div className={`${styles.wrapper} ${startDropSearch && styles.start}`}>
        <header ref={headerRef} className={`${styles.header} ${fixDropSearch && styles.active}`}>
          <div className="w-full flex justify-between items-center">
            <Brand />
            <div
              onClick={handleDropdownSearch}
              className={`${styles.toggleSearch} ${
                (isDropSearch || startDropSearch) && styles.active
              }`}>
              <div className="w-full">
                <Button
                  onClick={(e) => handleButtonClick(e, "where", "where")}
                  variant="ghost"
                  className={`rounded-r-none ${styles.button} ${
                    (isDropSearch || startDropSearch) && styles.active
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
                    (isDropSearch || startDropSearch) && styles.active
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
                  } ${(isDropSearch || startDropSearch) && styles.active}`}>
                  Add guests
                </Button>
                <div
                  className={`${styles.button_search} ${
                    (isDropSearch || startDropSearch) && styles.active
                  }`}>
                  <Search size={17} strokeWidth={3} />
                </div>
              </div>
            </div>
            <div className="z-30 w-fit flex items-center justify-end">
              <Button asChild variant="ghost" className="h-11 px-4">
                <Link href="/host/homes">Airbnb your home</Link>
              </Button>
              <LangAndRegion />
              <ProfileDropdown />
            </div>
          </div>
          <div className={`${styles.search} ${(isDropSearch || startDropSearch) && styles.active}`}>
            <Tabs
              onValueChange={setActiveTab}
              defaultValue="stays"
              className={`${styles.tabs} ${(isDropSearch || startDropSearch) && styles.active}`}>
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
                <TabsContent value="stays">
                  <div className="flex items-center">
                    <div
                      className={`${styles.tabs_content_item} ${
                        (isDropSearch || startDropSearch) && styles.active
                      }`}>
                      <label>
                        <div
                          onMouseEnter={() => setHover("where")}
                          onMouseLeave={() => setHover("")}
                          className={`${styles.filterItem} ${click === "where" && styles.click} ${
                            click === "checkin" && styles.hoverNeighborRight
                          }`}>
                          <div className="pl-3">
                            <div className="text-[13px] font-medium">Where</div>
                            <Input
                              className={`h-auto p-0 border-0 shadow-none ${
                                click.trim() && click !== "where"
                                  ? "placeholder:text-foreground"
                                  : "placeholder:text-muted-foreground"
                              }`}
                              onFocus={() => setClick("where")}
                              placeholder="Search destinations"
                            />
                          </div>
                        </div>
                      </label>
                      {/* where dropdown */}
                      {click === "where" && (
                        <div className="absolute w-full max-w-md bg-background shadow-lg border rounded-3xl mt-3 p-4">
                          Where Stays
                        </div>
                      )}
                    </div>
                    <Separator
                      orientation="vertical"
                      className={`h-8 ${
                        (click === "where" ||
                          click === "checkin" ||
                          hover === "where" ||
                          hover === "checkin") &&
                        "bg-transparent"
                      }`}
                    />
                    <div
                      className={`${styles.tabs_content_item} ${
                        (isDropSearch || startDropSearch) && styles.active
                      }`}>
                      <div className="flex items-center h-full">
                        <div
                          onMouseEnter={() => setHover("checkin")}
                          onMouseLeave={() => setHover("")}
                          onClick={() => setClick("checkin")}
                          className={`${styles.filterItem} ${click === "checkin" && styles.click} ${
                            click === "where" && styles.hoverNeighborLeft
                          } ${click === "checkout" && styles.hoverNeighborRight}`}>
                          <div>
                            <div className="text-[13px] font-medium">Check in</div>
                            <div
                              className={`text-sm ${
                                click.trim() && click !== "checkin"
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }`}>
                              Add dates
                            </div>
                          </div>
                        </div>
                        <Separator
                          orientation="vertical"
                          className={`h-8 ${
                            (click === "checkin" ||
                              hover === "checkin" ||
                              click === "checkout" ||
                              hover === "checkout") &&
                            "bg-transparent"
                          }`}
                        />
                        <div
                          onMouseEnter={() => setHover("checkout")}
                          onMouseLeave={() => setHover("")}
                          onClick={() => setClick("checkout")}
                          className={`${styles.filterItem} ${
                            click === "checkout" && styles.click
                          } ${click === "checkin" && styles.hoverNeighborLeft} ${
                            click === "who" && styles.hoverNeighborRight
                          }`}>
                          <div>
                            <div className="text-[13px] font-medium">Check out</div>
                            <div
                              className={`text-sm ${
                                click.trim() && click !== "checkout"
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }`}>
                              Add dates
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* checkin dropdown */}
                      {click === "checkin" && (
                        <div className="absolute left-0 w-full bg-background shadow-lg border rounded-3xl mt-3 p-4">
                          Checkin Stays
                        </div>
                      )}
                      {click === "checkout" && (
                        <div className="absolute left-0 w-full bg-background shadow-lg border rounded-3xl mt-3 p-4">
                          checkout Stays
                        </div>
                      )}
                    </div>
                    <Separator
                      orientation="vertical"
                      className={`h-8 ${
                        (click === "checkout" ||
                          hover === "checkout" ||
                          click === "who" ||
                          hover === "who") &&
                        "bg-transparent"
                      }`}
                    />
                    <div
                      className={`${styles.tabs_content_item} ${
                        (isDropSearch || startDropSearch) && styles.active
                      }`}>
                      <div
                        onMouseEnter={() => setHover("who")}
                        onMouseLeave={() => setHover("")}
                        onClick={() => setClick("who")}
                        className={`${styles.filterItem} ${click === "who" && styles.click} ${
                          click === "checkout" && styles.hoverNeighborLeft
                        } ${hover === "search" && styles.hover}`}>
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <div className="text-[13px] font-medium">Who</div>
                            <div
                              className={`text-sm ${
                                click.trim() && click !== "who"
                                  ? "text-foreground"
                                  : "text-muted-foreground"
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
                            <Search size={17} strokeWidth={3} />
                            {click.trim() && <span className="font-medium text-base">Search</span>}
                          </Button>
                        </div>
                      </div>
                      {click === "who" && (
                        <div className="absolute left-0 w-full bg-background shadow-lg border rounded-3xl mt-3 p-4">
                          who Stays
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="experiences">
                  <div className="flex items-center">
                    <div
                      className={`${styles.tabs_content_item} ${
                        (isDropSearch || startDropSearch) && styles.active
                      }`}>
                      <label>
                        <div
                          onMouseEnter={() => setHover("where")}
                          onMouseLeave={() => setHover("")}
                          className={`${styles.filterItem} ${click === "where" && styles.click} ${
                            click === "date" && styles.hoverNeighborRight
                          }`}>
                          <div className="pl-3">
                            <div className="text-[13px] font-medium">Where</div>
                            <Input
                              className={`h-auto p-0 border-0 shadow-none ${
                                click.trim() && click !== "where"
                                  ? "placeholder:text-foreground"
                                  : "placeholder:text-muted-foreground"
                              }`}
                              onFocus={() => setClick("where")}
                              placeholder="Search destinations"
                            />
                          </div>
                        </div>
                      </label>
                      {/* where dropdown */}
                      {click === "where" && (
                        <div className="absolute w-full max-w-md bg-background shadow-lg border rounded-3xl mt-3 p-4">
                          Where Experiences
                        </div>
                      )}
                    </div>
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
                    <div
                      className={`${styles.tabs_content_item} ${
                        (isDropSearch || startDropSearch) && styles.active
                      }`}>
                      <div
                        onMouseEnter={() => setHover("date")}
                        onMouseLeave={() => setHover("")}
                        onClick={() => setClick("date")}
                        className={`${styles.filterItem} ${click === "date" && styles.click} ${
                          click === "where" && styles.hoverNeighborLeft
                        } ${click === "who" && styles.hoverNeighborRight}`}>
                        <div>
                          <div className="text-[13px] font-medium">Date</div>
                          <div
                            className={`text-sm ${
                              click.trim() && click !== "date"
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}>
                            Add dates
                          </div>
                        </div>
                      </div>
                      {/* date dropdown */}
                      {click === "date" && (
                        <div className="absolute left-0 w-full bg-background shadow-lg border rounded-3xl mt-3 p-4">
                          Date experiences
                        </div>
                      )}
                    </div>
                    <Separator
                      orientation="vertical"
                      className={`h-8 ${
                        (click === "date" ||
                          hover === "date" ||
                          click === "who" ||
                          hover === "who") &&
                        "bg-transparent"
                      }`}
                    />
                    <div
                      className={`${styles.tabs_content_item} ${
                        (isDropSearch || startDropSearch) && styles.active
                      }`}>
                      <div
                        onMouseEnter={() => setHover("who")}
                        onMouseLeave={() => setHover("")}
                        onClick={() => setClick("who")}
                        className={`${styles.filterItem} ${click === "who" && styles.click} ${
                          click === "date" && styles.hoverNeighborLeft
                        } ${hover === "search" && styles.hover}`}>
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <div className="text-[13px] font-medium">Who</div>
                            <div
                              className={`text-sm ${
                                click.trim() && click !== "who"
                                  ? "text-foreground"
                                  : "text-muted-foreground"
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
                            <Search size={17} strokeWidth={3} />
                            {click.trim() && <span className="font-medium text-base">Search</span>}
                          </Button>
                        </div>
                      </div>
                      {click === "who" && (
                        <div className="absolute left-0 w-full bg-background shadow-lg border rounded-3xl mt-3 p-4">
                          who Experiences
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </header>
      </div>
      {fixDropSearch && (
        <div
          className={`fixed bg-foreground/20 top-0 left-0 w-full h-full transition-opacity duration-200 opacity-0 ${
            isDropSearch && "opacity-100"
          }`}
        />
      )}
    </>
  );
}
