"use client";
import useNavigateStore from "@/hooks/useNavbarStore";
import { useShallow } from "zustand/shallow";
import styles from "./navbar-bottom.module.scss";
import NavbarBottomMenu from "./navbar-bottom-menu";

import Toolbar from "./toolbar";

export default function NavbarBottom() {
  const { isScrolled } = useNavigateStore(
    useShallow((state) => ({
      isScrolled: state.isScrolled,
    }))
  );

  return (
    <div
      className={`${styles.categories} ${isScrolled && styles.scrolled} ${
        isScrolled > 15 && "shadow"
      }`}>
      <div className={styles.container}>
        <NavbarBottomMenu />
        {/* search */}
        <Toolbar />
      </div>
    </div>
  );
}
