"use client";
import useNavigateStore from "@/hooks/useNavigateStore";
import { useShallow } from "zustand/shallow";
import styles from "./navbar-category.module.css";
import NavbarCategoryList from "./navbar-category-list";

export default function NavbarCategory() {
  const { isScrolled } = useNavigateStore(
    useShallow((state) => ({
      isScrolled: state.isScrolled,
    }))
  );

  return (
    <div
      className={`fixed bg-background w-full ${
        isScrolled ? "h-[90px] top-[80px]" : "h-[90px] top-[172px]"
      } ${isScrolled > 10 && "shadow"}`}>
      <div className={styles.container}>
        <NavbarCategoryList />
        {/* search */}
        <div className="flex w-full">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio,
          incidunt.
        </div>
      </div>
    </div>
  );
}
