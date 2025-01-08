import React from "react";
import SearchBar from "./search-bar";

export default function Header() {
  return (
    <header className="border-b min-h-[168px] relative">
      <div className="max-w-[90%] mx-auto">
        <div className="flex justify-between items-center min-h-[80px]">
          <div>airbnb</div>
          <div className="flex">
            <div>airbnb your home</div>
            <div>Change lang</div>
            <div>auth</div>
          </div>
        </div>
        <SearchBar />
      </div>
    </header>
  );
}
