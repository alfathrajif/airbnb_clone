"use client";
// import useNavbarStore from "@/hooks/use-navbar-store";
// import React, { useEffect } from "react";
// import { useShallow } from "zustand/shallow";
import { Button } from "@/components/ui/button";
import styles from "./header.module.scss";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
// import SearchTabs from "./search-tabs";

// export default function NavbarHeader() {
//   const { isScrolled, setIsScrolled } = useNavbarStore(
//     useShallow((state) => ({
//       isScrolled: state.isScrolled,
//       setIsScrolled: state.setIsScrolled,
//     }))
//   );

//   useEffect(() => {
//     setIsScrolled(window.scrollY);

//     const handleScroll = () => {
//       setIsScrolled(window.scrollY);
//     };

//     window.addEventListener("scroll", handleScroll);

//     // clean up
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [setIsScrolled]);

//   return (
//     <>
//       <div className={`${styles.header} ${isScrolled && styles.off}`}>
//         <div className={styles.container}>
//           <div>Logo</div>
//           <div>nav</div>
//         </div>
//         <SearchTabs />
//       </div>
//     </>
//   );
// }

export default function NavbarHeader() {
  const [isDropSearch, setIsDropSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(0);
  const [hover, setHover] = useState<string>("");
  const [click, setClick] = useState<string>("");
  const [activeTab, setActiveTab] = useState("stays");

  const initialScrollY = useRef(0);

  const headerRef = useRef<HTMLDivElement>(null);
  const tabsListRef = useRef<HTMLDivElement>(null);
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

    const handleScroll = () => {
      setIsScrolled(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsScrolled(window.scrollY);

    if (isDropSearch && Math.abs(isScrolled - initialScrollY.current) > 60) {
      setIsDropSearch(false);
      setHover("");
      setClick("");
    }
    if (Math.abs(isScrolled - initialScrollY.current) > 60) {
      setHover("");
      setClick("");
    }
  }, [isScrolled, isDropSearch]);

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

  return (
    <>
      <div className={`${styles.wrapper} ${startDropSearch && styles.start}`}>
        <header ref={headerRef} className={`${styles.header} ${fixDropSearch && styles.active}`}>
          <div className="w-full flex justify-between items-center">
            <div className="w-full">airbnb</div>
            <div
              onClick={handleDropdownSearch}
              className={`${styles.toggleSearch} ${
                (isDropSearch || startDropSearch) && styles.active
              }`}>
              <div className="w-full">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    initialScrollY.current = window.scrollY;
                    setIsDropSearch(true);
                    setHover("where");
                    setClick("where");
                  }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    initialScrollY.current = window.scrollY;
                    setIsDropSearch(true);
                    if (activeTab === "stays") {
                      setHover("checkin");
                      setClick("checkin");
                    } else {
                      setHover("date");
                      setClick("date");
                    }
                  }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    initialScrollY.current = window.scrollY;
                    setIsDropSearch(true);
                    setHover("who");
                    setClick("who");
                  }}
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
            <div className="w-full flex justify-end">account etc.</div>
          </div>
          <div className={`${styles.search} ${(isDropSearch || startDropSearch) && styles.active}`}>
            <Tabs
              onValueChange={setActiveTab}
              defaultValue="stays"
              className={`${styles.tabs} ${(isDropSearch || startDropSearch) && styles.active}`}>
              <TabsList ref={tabsListRef} className="flex h-20 w-fit mx-auto">
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
                              className="h-auto p-0 border-0 shadow-none placeholder:text-muted-foreground"
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
                            <div className="text-sm text-muted-foreground">Add dates</div>
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
                            <div className="text-sm text-muted-foreground">Add dates</div>
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
                            <div className="text-sm text-muted-foreground">Add guests</div>
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
                              className="h-auto p-0 border-0 shadow-none placeholder:text-muted-foreground"
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
                          <div className="text-sm text-muted-foreground">Add dates</div>
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
                            <div className="text-sm text-muted-foreground">Add guests</div>
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
