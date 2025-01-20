"use client";
// import useNavigateStore from "@/hooks/use-navbar-store";
// import { useShallow } from "zustand/shallow";
import styles from "./navigation.module.scss";
import NavbarBottomMenu from "./menu";
import Toolbar from "./toolbar";
// import { Suspense } from "react";

// export default function NavbarNavigation() {
//   const { isScrolled } = useNavigateStore(
//     useShallow((state) => ({
//       isScrolled: state.isScrolled,
//     }))
//   );

//   return (
//     <div
//       className={`${styles.navigation} ${isScrolled && styles.off} ${isScrolled > 15 && "shadow"}`}>
//       <div className={styles.container}>
//         <Suspense>
//           <NavbarBottomMenu />
//         </Suspense>
//         {/* search */}
//         <Toolbar />
//       </div>
//     </div>
//   );
// }

import React from "react";

export default function NavbarNavigation() {
  return (
    <div className={styles.navigation}>
      <div className={styles.container}>
        <NavbarBottomMenu />
        <Toolbar />
      </div>
    </div>
  );
}
