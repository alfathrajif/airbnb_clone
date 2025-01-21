import Link from "next/link";
import React from "react";

export default function Brand() {
  return (
    <div className="w-fit mr-10">
      <Link href="/" className="font-dmSerifText tracking-tight text-primary text-2xl">
        <span className="hidden xl:inline">QuickStay</span>
        <span className="xl:hidden text-3xl">QS</span>
      </Link>
    </div>
  );
}
