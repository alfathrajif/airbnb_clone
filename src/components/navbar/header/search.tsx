"use client";

import { useShallow } from "zustand/shallow";
import useNavbarStore from "@/hooks/use-navbar-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import styles from "./search.module.scss";

export default function Search() {
  const { isScrolled } = useNavbarStore(
    useShallow((state) => ({
      isScrolled: state.isScrolled,
    }))
  );
  const [isHover, setIsHover] = useState<number | null>(0);
  const [hasDropdown, setHasDropdown] = useState(false);
  const [isClicked, setIsClicked] = useState<number | null>(0);
  const [isSearch, setIsSearch] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setHasDropdown(false);
        setIsClicked(null);
        setIsHover(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setHasDropdown, setIsClicked, setIsHover]);

  return (
    <>
      <Tabs
        defaultValue="stays"
        className={`${styles.search} ${isScrolled && styles.scrolled}`}>
        <TabsList
          className={`${styles.search__tabs} ${isScrolled && styles.scrolled}`}>
          <TabsTrigger value="stays">Stays</TabsTrigger>
          <TabsTrigger value="experiences">Experiences</TabsTrigger>
        </TabsList>
        <TabsContent
          value="stays"
          className={`${styles.search__input__wrapper} ${
            isScrolled && styles.scrolled
          }`}>
          <div
            ref={containerRef}
            className={`${styles.search__container} ${
              hasDropdown && styles.onDropdown
            }`}>
            <div className={styles.where}>
              <div
                onMouseEnter={() => setIsHover(1)}
                onMouseLeave={() => setIsHover(null)}
                className={`${styles.where__wrapper} ${
                  isClicked === 2
                    ? styles.onNeighbor_right
                    : isClicked === 1
                    ? styles.onClick
                    : hasDropdown && styles.onDropdown
                }`}>
                <label className="cursor-pointer">
                  <div className="flex flex-col h-full justify-center px-9">
                    <div className="text-[13px] font-medium">Where</div>
                    <Input
                      onFocus={() => {
                        setIsClicked(1);
                        setHasDropdown(true);
                      }}
                      className={`text-sm border-none ${
                        hasDropdown && isClicked !== 1
                          ? "placeholder:text-foreground"
                          : "placeholder:text-muted-foreground"
                      } p-0 h-auto shadow-none`}
                      placeholder="Search destinations"
                    />
                  </div>
                </label>
                {isClicked === 1 && (
                  <div className={styles.where__dropdown}>asdasd</div>
                )}
              </div>
            </div>
            <Separator
              className={`h-9 ${
                (isHover === 1 ||
                  isHover === 2 ||
                  isClicked === 1 ||
                  isClicked === 2) &&
                "bg-transparent"
              }`}
              orientation="vertical"
            />
            <div className="w-full h-full">
              <div className="flex h-full items-center">
                <div
                  onClick={() => {
                    setIsClicked(2);
                    setHasDropdown(true);
                  }}
                  onMouseEnter={() => setIsHover(2)}
                  onMouseLeave={() => setIsHover(null)}
                  className={`${styles.check} ${
                    isClicked === 1
                      ? styles.onNeighbor_left
                      : isClicked === 3
                      ? styles.onNeighbor_right
                      : isClicked === 2
                      ? styles.onClick
                      : hasDropdown && styles.onDropdown
                  }`}>
                  <div className={styles.check__button}>
                    <div className="text-[13px] font-medium">Check in</div>
                    <div
                      className={`text-sm ${
                        isClicked !== 2
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}>
                      Add dates
                    </div>
                  </div>
                  {isClicked === 2 && (
                    <div className={styles.check__dropdown}>
                      Check inCheck in Check in Check in Check in Check in Check
                      in
                    </div>
                  )}
                </div>
                <Separator
                  className={`h-9 ${
                    (isHover === 2 ||
                      isHover === 3 ||
                      isClicked === 2 ||
                      isClicked === 3) &&
                    "bg-transparent"
                  }`}
                  orientation="vertical"
                />
                <div
                  onClick={() => {
                    setIsClicked(3);
                    setHasDropdown(true);
                  }}
                  onMouseEnter={() => setIsHover(3)}
                  onMouseLeave={() => setIsHover(null)}
                  className={`${styles.check} ${
                    isClicked === 2
                      ? styles.onNeighbor_left
                      : isClicked === 4
                      ? styles.onNeighbor_right
                      : isClicked === 3
                      ? styles.onClick
                      : hasDropdown && styles.onDropdown
                  }`}>
                  <div className={styles.check__button}>
                    <div className="text-[13px] font-medium">Check out</div>
                    <div
                      className={`text-sm ${
                        isClicked !== 3
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}>
                      Add dates
                    </div>
                  </div>
                  {isClicked === 3 && (
                    <div className={styles.check__dropdown}>
                      Check outCheck outCheck outCheck outCheck outCheck
                      outCheck out
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Separator
              className={`h-9 ${
                (isHover === 3 ||
                  isHover === 4 ||
                  isClicked === 3 ||
                  isClicked === 4) &&
                "bg-transparent"
              } ${
                isSearch && isClicked !== 4 && isClicked !== 3 && "bg-border"
              }`}
              orientation="vertical"
            />
            <div className={styles.who}>
              <div
                onMouseEnter={() => setIsHover(4)}
                onMouseLeave={() => setIsHover(null)}
                onClick={() => {
                  setIsClicked(4);
                  setHasDropdown(true);
                }}
                className={`${styles.who__wrapper} ${
                  isClicked === 3
                    ? (isSearch && styles.onNeighbor_left_onSearch) ||
                      styles.onNeighbor_left
                    : isClicked === 4
                    ? styles.onClick
                    : hasDropdown && styles.onDropdown
                } ${isSearch && styles.onSearch}`}>
                <div className={`${styles.who__container}`}>
                  <div className={`${styles.who__button} `}>
                    <div className="text-[13px] font-medium">Who</div>
                    <div
                      className={`text-sm ${
                        isClicked !== 4
                          ? "text-foreground"
                          : "text-muted-foreground"
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
                        isClicked === 4
                          ? "w-fit <gap-x-2></gap-x-2> px-4"
                          : "w-12"
                      }`}>
                      <SearchIcon strokeWidth={2.5} />
                      {isClicked === 4 && (
                        <span className="font-medium">Search</span>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              {isClicked === 4 && (
                <div className={styles.who__dropdown}>
                  who whowhowhowhowhowhowhowhowhowho
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent
          value="experiences"
          className={`${styles.search__input__wrapper} ${
            isScrolled && styles.scrolled
          }`}>
          asdasd
        </TabsContent>
      </Tabs>
    </>
  );
}
