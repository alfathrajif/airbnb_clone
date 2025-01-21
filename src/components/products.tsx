"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import photo from "@/assets/photo-1512917774080-9991f1c4c750.avif";
import styles from "./products.module.scss";

export default function Products() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [imageWidth, setImageWidth] = useState<number | null>(null);

  const updateImageWidth = () => {
    if (imageRef.current) {
      setImageWidth(imageRef.current.clientWidth);
    }
  };

  useEffect(() => {
    // Update width on mount
    updateImageWidth();

    // Add event listener for window resize
    window.addEventListener("resize", updateImageWidth);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", updateImageWidth);
    };
  }, []);

  return (
    <div className="py-5">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {Array(20)
            .fill(0)
            .map((_, index) => (
              <div key={index} className={styles.product}>
                <div
                  className={styles.product__image}
                  style={{ height: `${imageWidth}px` }}
                  ref={index === 0 ? imageRef : null}>
                  <Image
                    src={photo}
                    alt="photo"
                    width={500}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="py-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, deleniti?
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
