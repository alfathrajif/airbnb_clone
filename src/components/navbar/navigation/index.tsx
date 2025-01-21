"use client";
import styles from "./navigation.module.scss";
import NavbarBottomMenu from "./menu";
import Toolbar from "./toolbar";
import React from "react";
import useNavbarStore from "@/hooks/use-navbar-store";
import { useShallow } from "zustand/shallow";

export default function NavbarNavigation() {
  const { isScrolled } = useNavbarStore(
    useShallow((state) => ({
      isScrolled: state.isScrolled,
    }))
  );

  return (
    <div className={`${styles.navigation} ${isScrolled > 10 && "shadow"}`}>
      <div className={styles.container}>
        <NavbarBottomMenu />
        <Toolbar />
      </div>
    </div>
  );
}
