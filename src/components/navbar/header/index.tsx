"use client";
import { Button } from "@/components/ui/button";
import useNavbarStore from "@/hooks/use-navbar-store";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";
import Brand from "./head/brand";
import styles from "./header.module.scss";
import LangAndRegion from "./head/lang-and-region";
import ProfileDropdown from "./head/profile-dropdown";
import Search from "./search";
import { SearchToggle } from "./head/search-toggle-display";

export default function NavbarHeader() {
  // component logic is dangerous to change, be careful!!!

  const {
    isScrolled,
    setIsScrolled,
    isDropSearch,
    setIsDropSearch,
    setHover,
    click,
    setClick,
    activeTab,
  } = useNavbarStore(
    useShallow((state) => ({
      isScrolled: state.isScrolled,
      setIsScrolled: state.setIsScrolled,
      isDropSearch: state.isDropSearch,
      setIsDropSearch: state.setIsDropSearch,
      setHover: state.setHover,
      click: state.click,
      setClick: state.setClick,
      activeTab: state.activeTab,
    }))
  );

  const initialScrollY = useRef(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        headerRef.current &&
        !headerRef.current.contains(target) &&
        target instanceof Element &&
        !target.closest("button")
      ) {
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

  useEffect(() => {
    setIsScrolled(window.scrollY);
    const scrollDiff = Math.abs(isScrolled - initialScrollY.current);

    if (scrollDiff > 60) {
      setHover("");
      setClick("");
      if (isDropSearch) setIsDropSearch(false);
    }
  }, [isDropSearch, isScrolled, setClick, setHover, setIsDropSearch, setIsScrolled]);

  useEffect(() => {
    if (click.trim() && click !== "where") {
      setHover("");
      setClick("on");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const isScrolledWhenDropSearch = isDropSearch && isScrolled > 0;
  const isScrollOnStart = isScrolled === 0;

  return (
    <>
      <div className={`${styles.wrapper} ${isScrollOnStart && styles.start}`}>
        <header
          ref={headerRef}
          className={`${styles.header} ${isScrolledWhenDropSearch && styles.active}`}>
          <div className="w-full flex justify-between items-center">
            <Brand />
            <SearchToggle.Display
              initialScrollY={initialScrollY}
              isScrollOnStart={isScrollOnStart}
            />
            <div className="z-30 w-fit flex items-center justify-end">
              <Button asChild variant="ghost" className="h-11 px-4">
                <Link href="/host/homes">Airbnb your home</Link>
              </Button>
              <LangAndRegion />
              <ProfileDropdown />
            </div>
          </div>
          <Search isScrollOnStart={isScrollOnStart} tabsContentRef={tabsContentRef} />
        </header>
      </div>
      {isScrolledWhenDropSearch && <SearchToggle.Backdrop />}
    </>
  );
}
