"use client";
import useNavigateStore from "@/hooks/use-navbar-store";
import { useShallow } from "zustand/shallow";
import styles from "./navigation.module.scss";
import NavbarBottomMenu from "./menu";

import Toolbar from "./toolbar";
import { Suspense } from "react";

export default function NavbarNavigation() {
  const { isScrolled } = useNavigateStore(
    useShallow((state) => ({
      isScrolled: state.isScrolled,
    }))
  );

  return (
    <div
      className={`${styles.navigation} ${isScrolled && styles.scrolled} ${
        isScrolled > 15 && "shadow"
      }`}>
      <div className={styles.container}>
        <Suspense>
          <NavbarBottomMenu />
        </Suspense>
        {/* search */}
        <Toolbar />
      </div>
    </div>
  );
}
