import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import styles from "./menu.module.scss";
import { categories } from "@/constants";
import { iconMapping } from "@/constants/icon-mapping";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NavbarBottomMenu() {
  const router = useRouter();
  const params = useSearchParams();

  const categoryParams = params.get("category");

  const currentPath = categoryParams || "tropical";

  const categoriesRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const element = categoriesRef.current;

      if (element) {
        const { scrollLeft, scrollWidth, clientWidth } = element;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
      }
    };

    const categoriesElement = categoriesRef.current;
    if (categoriesElement) {
      categoriesElement.addEventListener("scroll", handleScroll);

      handleScroll();
    }

    return () => {
      if (categoriesElement) {
        categoriesElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="w-fit relative">
      <div ref={categoriesRef} className={styles.categories}>
        {categories.map((category, index) => {
          const Icon = iconMapping[category.icon];
          return (
            <Button
              key={index}
              onClick={() =>
                router.push(
                  !categoryParams && category.path === "tropical"
                    ? "/"
                    : `/?category=${category.path}`
                )
              }
              variant="ghost"
              className={`${
                styles.categoryItem
              } text-muted-foreground/80 hover:bg-transparent [&_svg]:size-6 ${
                category.path === currentPath
                  ? `text-foreground cursor-default ${styles.categoryItemActive}`
                  : ""
              }`}>
              {React.cloneElement(<Icon />, { strokeWidth: 1.5 })}
              <div className="text-sm font-semibold">{category.name}</div>
            </Button>
          );
        })}
      </div>

      {canScrollLeft && (
        <div className={styles.prev}>
          <Button size="icon" variant="outline" className="[&_svg]:size-5" onClick={scrollLeft}>
            <ChevronLeft />
          </Button>
        </div>
      )}
      {canScrollRight && (
        <div className={styles.next}>
          <Button size="icon" variant="outline" className="[&_svg]:size-5" onClick={scrollRight}>
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
