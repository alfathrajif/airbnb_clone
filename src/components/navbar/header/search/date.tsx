import { Button } from "@/components/ui/button";
import useNavbarStore from "@/hooks/use-navbar-store";
import { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { useShallow } from "zustand/shallow";
import "./date.css";
import stylesDate from "./date.module.scss";
import stylesIndex from "./index.module.scss";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import moment from "moment";

export default function SearchDate({ isScrollOnStart }: { isScrollOnStart: boolean }) {
  const { isDropSearch, setHover, click, setClick } = useNavbarStore(
    useShallow((state) => ({
      isDropSearch: state.isDropSearch,
      setHover: state.setHover,
      click: state.click,
      setClick: state.setClick,
    }))
  );

  const defaultClassNames = getDefaultClassNames();

  const [numberOfMonths, setNumberOfMonths] = useState(3);
  const [transformValue, setTransformValue] = useState<number>(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<{
    from: Date | undefined;
    to?: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const handleLeftClick = () => {
    if (transformValue < 0) {
      setTransformValue((prev) => prev + 419);
      setNumberOfMonths((prev) => prev - 1);
      setCurrentMonth((prev) => new Date(prev.setMonth(prev.getMonth() - 1)));
    }
  };

  const handleRightClick = () => {
    setTransformValue((prev) => prev - 419);
    setNumberOfMonths((prev) => prev + 1);
    setCurrentMonth((prev) => new Date(prev.setMonth(prev.getMonth() + 1)));
  };

  const getDate = (date: Date) => {
    const formatDate = moment(date.toLocaleDateString()).format("l").split("/");

    return {
      day: formatDate[1],
      year: formatDate[2],
      month: formatDate[0],
    };
  };

  return (
    <div
      className={`${stylesIndex.tabs_content_item} ${
        (isDropSearch || isScrollOnStart) && stylesIndex.active
      }`}>
      <div
        onMouseEnter={() => setHover("date")}
        onMouseLeave={() => setHover("")}
        onClick={() => setClick("date")}
        className={`${stylesIndex.filterItem} ${click === "date" && stylesIndex.click} ${
          click === "where" && stylesIndex.hoverNeighborLeft
        } ${click === "who" && stylesIndex.hoverNeighborRight}`}>
        <div>
          <div className="text-[13px] font-medium">Date</div>
          {selectedDates.from && selectedDates.to ? (
            <div className="text-sm text-foreground font-medium">
              {getDate(selectedDates.to).year !== getDate(selectedDates.from).year
                ? moment(selectedDates.from.toLocaleDateString()).format("ll")
                : moment(selectedDates.from.toLocaleDateString()).format("ll").split(",")[0]}{" "}
              {selectedDates.to === selectedDates.from
                ? ""
                : ` - ${
                    getDate(selectedDates.from).month === getDate(selectedDates.to).month
                      ? moment(selectedDates.to.toLocaleDateString()).format("l").split("/")[1]
                      : getDate(selectedDates.to).year !== getDate(selectedDates.from).year
                      ? moment(selectedDates.to.toLocaleDateString()).format("ll")
                      : moment(selectedDates.to.toLocaleDateString()).format("ll").split(",")[0]
                  }`}
            </div>
          ) : (
            <div
              className={`text-sm ${
                click.trim() && click !== "date" ? "text-foreground" : "text-muted-foreground"
              }`}>
              Add dates
            </div>
          )}
        </div>
        {click === "date" && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedDates({ from: undefined, to: undefined });
            }}
            className={`[&_svg]:size-4 text-foreground w-7 h-7 z-10 hover:bg-muted-foreground/20 absolute right-4 mx-0 ${
              selectedDates.from && selectedDates.to ? "" : "hidden"
            }`}>
            <X />
          </Button>
        )}
      </div>
      {/* date dropdown */}
      {click === "date" && (
        <div className={stylesDate.content}>
          <div className={stylesDate.container}>
            <Button
              variant="ghost"
              size="icon"
              className={`[&_svg]:size-5 absolute z-10 left-7 top-12 -translate-y-1/2 ${
                transformValue === 0 && "hidden"
              }`}
              onClick={handleLeftClick}
              disabled={transformValue === 0}>
              <ChevronLeft />
            </Button>
            <DayPicker
              classNames={{
                disabled: `${defaultClassNames.disabled} rounded-full ring-1 ring-transparent`,
                day: `${defaultClassNames.day} rounded-full hover:ring-1 hover:z-10 ring-foreground`,
                day_button: `rounded-full min-w-full min-h-full`,
                root: `${defaultClassNames.root} pt-12 pb-10 px-16`,
                selected: `bg-foreground text-background ring-1 ring-foreground`,
                range_start: `rounded-full bg-foreground text-background ring-1 ring-foreground`,
                range_middle: `rounded-none bg-muted-foreground/10 text-zinc-900 ring-1 ring-transparent`,
                range_end: `rounded-full bg-foreground text-background ring-1 ring-foreground`,
                today: `rounded-full`,
              }}
              style={{
                marginLeft: `${transformValue}px`,
                transition: "0.2s ease",
              }}
              mode="range"
              numberOfMonths={numberOfMonths}
              disabled={{ before: new Date() }}
              defaultMonth={currentMonth}
              hideNavigation
              selected={selectedDates}
              onSelect={(range) => setSelectedDates(range ?? { from: undefined, to: undefined })}
            />
            <Button
              variant="ghost"
              size="icon"
              className={`[&_svg]:size-5 absolute z-10 right-7 top-12 -translate-y-1/2`}
              onClick={handleRightClick}>
              <ChevronRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
