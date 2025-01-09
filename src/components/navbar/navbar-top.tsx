"use client";
import useNavigateStore from "@/hooks/useNavigateStore";
import React, { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import styles from "./navbar-top.module.scss";

export default function NavbarTop() {
  const { isScrolled, setIsScrolled } = useNavigateStore(
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
    <div className={`${styles.header} ${isScrolled && styles.scrolled}`}>
      header
    </div>
  );
}
