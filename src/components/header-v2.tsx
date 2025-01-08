"use client";
import useNavigateStore from "@/hooks/useNavigateStore";
import React, { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function Header() {
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
    <div
      className={`fixed z-50 w-full bg-background top-0 border-b transition-all ease-out duration-300 ${
        isScrolled ? "h-[80px]" : "h-[168px]"
      }`}></div>
  );
}
