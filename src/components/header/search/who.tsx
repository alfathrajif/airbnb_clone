import useNavbarStore from "@/hooks/use-navbar-store";
import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import stylesIndex from "./index.module.scss";
import stylesWho from "./who.module.scss";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Search as SearchIcon, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import useWhoStore from "@/hooks/use-who-store";

export default function Who({
  isScrollOnStart,
  tabsContent,
}: {
  isScrollOnStart: boolean;
  tabsContent: string;
}) {
  const { isDropSearch, hover, setHover, click, setClick } = useNavbarStore(
    useShallow((state) => ({
      isDropSearch: state.isDropSearch,
      hover: state.hover,
      setHover: state.setHover,
      click: state.click,
      setClick: state.setClick,
    }))
  );

  const { guest, setAdults, setChildren, infants, setInfants, pets, setPets } = useWhoStore(
    useShallow((state) => ({
      guest: state.guest,
      infants: state.infants,
      pets: state.pets,
      setAdults: state.setAdults,
      setChildren: state.setChildren,
      setInfants: state.setInfants,
      setPets: state.setPets,
    }))
  );

  const handleReset = () => {
    setAdults(0);
    setChildren(0);
    setInfants(0);
    setPets(0);
  };

  return (
    <div
      className={`${stylesIndex.tabs_content_item} ${
        (isDropSearch || isScrollOnStart) && stylesIndex.active
      }`}>
      <div
        onMouseEnter={() => setHover("who")}
        onMouseLeave={() => setHover("")}
        onClick={() => setClick("who")}
        className={`${stylesIndex.filterItem} ${click === "who" && stylesIndex.click} ${
          (click === "checkout" || click === "date" || click === "when") &&
          stylesIndex.hoverNeighborLeft
        } ${hover === "search" && stylesIndex.hover}`}>
        <div className="flex items-center justify-between w-full">
          <div className={`${stylesWho.item} ${click && stylesWho.click}`}>
            <div className={stylesWho.item_title}>Who</div>
            {guest > 0 ? (
              <div className={`${stylesWho.item_value} ${click === "who" && stylesWho.click}`}>
                {guest === 16 ? "16+ guests" : `${guest} ${guest > 1 ? "guests" : "guest"}`}
                {infants > 0 && `, ${infants} ${infants > 1 ? "infants" : "infant"}`}{" "}
                {pets > 0 && `, ${pets} ${pets > 1 ? "pets" : "pet"}`}
              </div>
            ) : (
              <div
                className={`text-sm ${
                  click.trim() && click !== "who" ? "text-foreground" : "text-muted-foreground"
                }`}>
                Add guests
              </div>
            )}
            {click === "who" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleReset}
                className={`[&_svg]:size-4 text-foreground w-7 h-7 z-10 hover:bg-muted-foreground/20 absolute top-1/2 -translate-y-1/2 -right-6 mx-0 ${
                  guest > 0 ? "" : "hidden"
                }`}>
                <X />
              </Button>
            )}
          </div>
          <Button
            onMouseEnter={(e) => {
              e.stopPropagation();
              setHover("search");
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setHover("");
            }}
            className={`${stylesIndex.searchButton} ${click.trim() && stylesIndex.click}`}>
            <SearchIcon strokeWidth={2.5} />
            {click.trim() && <span className="font-medium text-base">Search</span>}
          </Button>
        </div>
      </div>
      {click === "who" && (tabsContent === "stays" ? <ContentStays /> : <ContentExperiences />)}
    </div>
  );
}

const ContentStays = () => {
  const { setGuest, adults, setAdults, children, setChildren, infants, setInfants, pets, setPets } =
    useWhoStore(
      useShallow((state) => ({
        setGuest: state.setGuest,
        adults: state.adults,
        setAdults: state.setAdults,
        children: state.children,
        setChildren: state.setChildren,
        infants: state.infants,
        setInfants: state.setInfants,
        pets: state.pets,
        setPets: state.setPets,
      }))
    );

  const [minLimit, setMinLimit] = useState(false);

  const maxAdults = 16 - children;
  const maxChildren = 16 - adults;

  useEffect(() => {
    if (children > 0 || infants > 0 || pets > 0) {
      setAdults(Math.max(adults, 1));
    }
    setMinLimit(adults <= 1 && (children > 0 || infants > 0 || pets > 0));
    setGuest(adults + children);
  }, [adults, children, infants, pets, setAdults, setGuest]);

  return (
    <div className={stylesWho.content}>
      <div className="p-8">
        <div className="flex justify-between">
          <div className="w-full">
            <div className="text-[15px] font-medium">Adults</div>
            <div className="text-sm font-normal text-muted-foreground">Ages 13 or above</div>
          </div>
          <Counter count={adults} setter={setAdults} maxLimit={maxAdults} minLimit={minLimit} />
        </div>
        <Separator className="my-5" />
        <div className="flex justify-between">
          <div className="w-full">
            <div className="text-[15px] font-medium">Children</div>
            <div className="text-sm font-normal text-muted-foreground">Ages 2 &#x2212; 12</div>
          </div>
          <Counter count={children} setter={setChildren} maxLimit={maxChildren} />
        </div>
        <Separator className="my-5" />
        <div className="flex justify-between">
          <div className="w-full">
            <div className="text-[15px] font-medium">Infants</div>
            <div className="text-sm font-normal text-muted-foreground">Under 2</div>
          </div>
          <Counter count={infants} setter={setInfants} maxLimit={5} />
        </div>
        <Separator className="my-5" />
        <div className="flex justify-between">
          <div className="w-full">
            <div className="text-[15px] font-medium">Pets</div>
            <div className="text-sm font-normal text-muted-foreground">
              <Link href="#" className="underline">
                Bringing a service animal?
              </Link>
            </div>
          </div>
          <Counter count={pets} setter={setPets} maxLimit={5} />
        </div>
      </div>
    </div>
  );
};

const ContentExperiences = () => {
  const { setGuest, adults, setAdults, children, setChildren, infants, setInfants, pets } =
    useWhoStore(
      useShallow((state) => ({
        setGuest: state.setGuest,
        adults: state.adults,
        setAdults: state.setAdults,
        children: state.children,
        setChildren: state.setChildren,
        infants: state.infants,
        setInfants: state.setInfants,
        pets: state.pets,
      }))
    );

  const [minLimit, setMinLimit] = useState(false);

  const maxAdults = 16 - children;
  const maxChildren = 16 - adults;

  useEffect(() => {
    if (children > 0 || infants > 0 || pets > 0) {
      setAdults(Math.max(adults, 1));
    }
    setMinLimit(adults <= 1 && (children > 0 || infants > 0 || pets > 0));
    setGuest(adults + children);
  }, [adults, children, infants, pets, setAdults, setGuest]);

  return (
    <div className={stylesWho.content}>
      <div className="p-8">
        <div className="flex justify-between">
          <div className="w-full">
            <div className="text-[15px] font-medium">Adults</div>
            <div className="text-sm font-normal text-muted-foreground">Ages 13 or above</div>
          </div>
          <Counter count={adults} setter={setAdults} maxLimit={maxAdults} minLimit={minLimit} />
        </div>
        <Separator className="my-5" />
        <div className="flex justify-between">
          <div className="w-full">
            <div className="text-[15px] font-medium">Children</div>
            <div className="text-sm font-normal text-muted-foreground">Ages 2 &#x2212; 12</div>
          </div>
          <Counter count={children} setter={setChildren} maxLimit={maxChildren} />
        </div>
        <Separator className="my-5" />
        <div className="flex justify-between">
          <div className="w-full">
            <div className="text-[15px] font-medium">Infants</div>
            <div className="text-sm font-normal text-muted-foreground">Under 2</div>
          </div>
          <Counter count={infants} setter={setInfants} maxLimit={5} />
        </div>
      </div>
    </div>
  );
};

interface CounterProps {
  count: number;
  setter: (count: number) => void;
  maxLimit: number;
  minLimit?: boolean;
}

const Counter: React.FC<CounterProps> = ({ count, setter, maxLimit, minLimit }) => {
  return (
    <div className="flex items-center justify-between max-w-[120px] min-w-[120px]">
      <Button
        size="icon"
        variant="outline"
        className={`min-w-9 min-h-9 text-foreground/60 hover:border-muted-foreground ${
          count === 0 && "pointer-events-none opacity-0 text-foreground/40"
        }`}
        disabled={count === 0 || minLimit}
        onClick={() => setter(Math.max(count - 1, 0))}>
        <Minus />
      </Button>
      <span className="text-center w-6">{count === 16 ? "16+" : count}</span>
      <Button
        size="icon"
        variant="outline"
        className={`min-w-9 min-h-9 text-foreground/60 hover:border-muted-foreground ${
          count === maxLimit && "pointer-events-none opacity-0 text-foreground/40"
        }`}
        disabled={count === maxLimit}
        onClick={() => setter(Math.min(count + 1, maxLimit))}>
        <Plus />
      </Button>
    </div>
  );
};
