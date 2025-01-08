"use client";
import Image from "next/image";
import React from "react";
import photo from "@/assets/photo-1512917774080-9991f1c4c750.avif";
import useNavigateStore from "@/hooks/useNavigateStore";
import { useShallow } from "zustand/shallow";
import styles from "./products.module.css";

export default function Products() {
  const { isScrolled } = useNavigateStore(
    useShallow((state) => ({
      isScrolled: state.isScrolled,
    }))
  );

  return (
    <div className={isScrolled ? `mt-[190px]` : "mt-[270px]"}>
      <div className={styles.container}>
        <div className={styles.products}>
          {Array(20)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <div className="border rounded-2xl bg-primary h-[250px] overflow-hidden">
                  <Image
                    src={photo}
                    alt="photo"
                    width={500}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="py-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellendus, deleniti?
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
