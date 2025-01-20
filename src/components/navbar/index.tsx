import React, { Suspense } from "react";
import NavbarNavigation from "./navigation";
import NavbarHeader from "./header";

export default function Navbar() {
  return (
    <>
      <NavbarHeader />
      <Suspense>
        <NavbarNavigation />
      </Suspense>
    </>
  );
}
