import { Button } from "@/components/ui/button";
import useNavigateStore from "@/hooks/useNavigateStore";
import {
  CableCar,
  Castle,
  ChevronLeft,
  ChevronRight,
  Dog,
  Earth,
  HandPlatter,
  House,
  HousePlug,
  LandPlot,
  ListPlus,
  Siren,
  Snowflake,
  Sparkles,
  Split,
  SquareActivity,
  TableCellsMerge,
  TreeDeciduous,
  TreePalm,
  View,
  Warehouse,
  Waves,
  WavesLadder,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useShallow } from "zustand/shallow";
import styles from "./navbar-category.module.css";
import { useEffect, useRef, useState } from "react";

export default function NavbarCategory() {
  const router = useRouter();
  const params = useSearchParams();

  const categoryParams = params.get("category");
  const { isScrolled } = useNavigateStore(
    useShallow((state) => ({
      isScrolled: state.isScrolled,
    }))
  );

  const categories = [
    { name: "Tropical", icon: <TreeDeciduous />, path: "tropical" },
    { name: "Icons", icon: <Sparkles />, path: "icons" },
    { name: "Beachfront", icon: <Waves />, path: "beachfront" },
    { name: "Castles", icon: <Castle />, path: "castles" },
    { name: "Islands", icon: <TreePalm />, path: "islands" },
    { name: "New", icon: <ListPlus />, path: "new" },
    { name: "Tiny homes", icon: <House />, path: "tiny-homes" },
    { name: "Amazing views", icon: <View />, path: "amazing-views" },
    {
      name: "Amazing pools",
      icon: <WavesLadder />,
      path: "amazing-pools",
    },
    { name: "OMG!", icon: <Siren />, path: "omg" },
    { name: "Mansions", icon: <Warehouse />, path: "mansions" },
    { name: "Treehouses", icon: <HousePlug />, path: "treehouses" },
    { name: "Ski-in/out", icon: <CableCar />, path: "ski-in-out" },
    { name: "Off-the-grid", icon: <TableCellsMerge />, path: "off-the-grid" },
    { name: "Cabins", icon: <Dog />, path: "cabins" },
    { name: "Lakefront", icon: <Snowflake />, path: "lakefront" },
    { name: "Luxe", icon: <HandPlatter />, path: "luxe" },
    { name: "Rooms", icon: <SquareActivity />, path: "rooms" },
    { name: "Top of the world", icon: <Earth />, path: "top-of-the-world" },
    { name: "Islands", icon: <Split />, path: "islands" },
    { name: "Golfing", icon: <LandPlot />, path: "golfing" },
  ];

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

    const handleWheelScroll = (event: WheelEvent) => {
      const element = categoriesRef.current;

      if (element && event.deltaY !== 0) {
        event.preventDefault();
        element.scrollLeft += event.deltaY;
      }
    };

    const categoriesElement = categoriesRef.current;
    if (categoriesElement) {
      categoriesElement.addEventListener("scroll", handleScroll);
      categoriesElement.addEventListener("wheel", handleWheelScroll);

      handleScroll();
    }

    return () => {
      if (categoriesElement) {
        categoriesElement.removeEventListener("scroll", handleScroll);
        categoriesElement.removeEventListener("wheel", handleWheelScroll);
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
    <div
      className={`fixed bg-background w-full ${
        isScrolled ? "h-[90px] top-[80px]" : "h-[90px] top-[172px]"
      } ${isScrolled > 10 && "shadow"}`}>
      <div className={styles.container}>
        {/* categories */}
        <div className="flex items-center w-full relative">
          <div ref={categoriesRef} className={styles.categories}>
            {categories.map((category, index) => (
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
                {category.icon}
                <div className="text-sm font-semibold">{category.name}</div>
              </Button>
            ))}
          </div>

          {canScrollLeft && (
            <div className={styles.prev}>
              <Button
                size="icon"
                variant="outline"
                className="[&_svg]:size-5"
                onClick={scrollLeft}>
                <ChevronLeft />
              </Button>
            </div>
          )}
          {canScrollRight && (
            <div className={styles.next}>
              <Button
                size="icon"
                variant="outline"
                className="[&_svg]:size-5"
                onClick={scrollRight}>
                <ChevronRight />
              </Button>
            </div>
          )}
        </div>
        {/* search */}
        <div className="flex w-full">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio,
          incidunt.
        </div>
      </div>
    </div>
  );
}
