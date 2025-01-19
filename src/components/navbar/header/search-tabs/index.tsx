"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useNavbarStore from "@/hooks/use-navbar-store";
import useSearchTabsStore from "@/hooks/use-tabs-search-store";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";
import Experiences from "./experiences";
import styles from "./search-tabs.module.scss";
import Stays from "./stays";

export default function SearchTabs() {
  const { isScrolled } = useNavbarStore(
    useShallow((state) => ({
      isScrolled: state.isScrolled,
    }))
  );

  const { setIsHovered, isClicked, setIsClicked, closeDropdown } = useSearchTabsStore(
    useShallow((state) => ({
      isHovered: state.isHovered,
      setIsHovered: state.setIsHovered,
      isClicked: state.isClicked,
      setIsClicked: state.setIsClicked,
      isSearch: state.isSearch,
      hasDropdown: state.hasDropdown,
      setHasDropdown: state.setHasDropdown,
      handleActiveDropdown: state.handleActiveDropdown,
      handleMouseEnter: state.handleMouseEnter,
      handleMouseLeave: state.handleMouseLeave,
      closeDropdown: state.closeDropdown,
    }))
  );

  const [activeTab, setActiveTab] = useState("stays");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        tabsRef.current &&
        !tabsRef.current.contains(target)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closeDropdown]);

  useEffect(() => {
    if (isClicked !== 1) {
      setIsClicked(null);
      setIsHovered(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useEffect(() => {
    if (isScrolled > 0) {
      closeDropdown();
    }
  }, [isScrolled, closeDropdown]);

  return (
    <>
      <Tabs
        onValueChange={setActiveTab}
        defaultValue="stays"
        className={`${styles.search} ${isScrolled && styles.scrolled}`}>
        <TabsList
          ref={tabsRef}
          className={`${styles.search__tabs} ${isScrolled && styles.scrolled} `}>
          <TabsTrigger value="stays" className="text-[15px]">
            Stays
          </TabsTrigger>
          <TabsTrigger value="experiences" className="text-[15px]">
            Experiences
          </TabsTrigger>
        </TabsList>
        <Stays containerRef={containerRef} />
        <Experiences containerRef={containerRef} />
      </Tabs>
    </>
  );
}
