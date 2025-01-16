"use client";
import useNavbarStore from "@/hooks/use-navbar-store";
import React, { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import styles from "./header.module.scss";

export default function NavbarHeader() {
  const { isScrolled, setIsScrolled } = useNavbarStore(
    useShallow((state) => ({
      isScrolled: state.isScrolled,
      setIsScrolled: state.setIsScrolled,
    }))
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setIsScrolled]);

  return (
    <>
      <div className={`${styles.header} ${isScrolled && styles.scrolled}`}>
        header
      </div>
    </>
  );
}
