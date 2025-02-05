import { Button } from "@/components/ui/button";
import useNavbarStore from "@/hooks/use-navbar-store";
import { useWhenStore } from "@/hooks/use-when-store";
import { TabsContent } from "@radix-ui/react-tabs";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

const TABS_OPTIONS = [
  { label: "Weekend", value: "weekend" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];

const TabsContentFlexible = () => {
  const { tabsFlexible, setTabsFlexible } = useNavbarStore(
    useShallow((state) => ({
      tabsFlexible: state.tabsFlexible,
      setTabsFlexible: state.setTabsFlexible,
    }))
  );

  const { selectedDates, setSelectedDates, setSelectedMonths } = useWhenStore(
    useShallow((state) => ({
      selectedDates: state.selectedDates,
      setSelectedDates: state.setSelectedDates,
      setSelectedMonths: state.setSelectedMonths,
    }))
  );

  return (
    <TabsContent value="flexible">
      <div className="text-center text-lg font-medium mb-4">Stay for a {tabsFlexible}</div>
      <div className="w-full flex justify-center gap-x-2 mb-10">
        {TABS_OPTIONS.map(({ label, value }) => (
          <Button
            key={value}
            variant="outline"
            onClick={() => setTabsFlexible(value)}
            className={`p-5 font-normal border-none active:scale-95 transition-all duration-100 ${
              tabsFlexible === value
                ? "ring-2 ring-foreground bg-muted-foreground/5"
                : "ring-1 ring-border hover:bg-background hover:ring-foreground"
            }`}>
            {label}
          </Button>
        ))}
      </div>
      <div className="text-center text-lg font-medium mb-4">Go anytime</div>
      <WeekendButtons
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        setSelectedMonths={setSelectedMonths}
      />
    </TabsContent>
  );
};

const generateWeekends = () => {
  const weekends = [];
  const currentDate = moment();
  const endDate = moment().add(1, "year").endOf("month");

  while (currentDate.isBefore(endDate)) {
    const month = currentDate.format("MMMM");
    const year = currentDate.format("YYYY");
    const monthWeekends = [];

    while (currentDate.format("MMMM") === month) {
      if ([5, 6, 0].includes(currentDate.day())) {
        monthWeekends.push(currentDate.clone().format("YYYY-MM-DD"));
      }
      currentDate.add(1, "day");
    }

    if (monthWeekends.length) weekends.push({ month, year, dates: monthWeekends });
  }

  return weekends;
};

const WeekendButtons = ({
  selectedDates,
  setSelectedDates,
  setSelectedMonths,
}: {
  selectedDates: string[];
  setSelectedMonths: (selectedMonths: string) => void;
  setSelectedDates: (selectedDates: string[]) => void;
}) => {
  const weekends = generateWeekends();
  const [transformValue, setTransformValue] = useState<number>(0);

  const toggleDateSelection = (dates: string[]) => {
    const isSelected = dates.every((date) => selectedDates.includes(date));
    const updatedSelection = isSelected
      ? selectedDates.filter((date) => !dates.includes(date))
      : [...selectedDates, ...dates];

    const formattedMonths = [
      ...new Set(updatedSelection.map((date) => moment(date).format("MMM"))),
    ].join(", ");

    setSelectedMonths(formattedMonths);
    setSelectedDates(updatedSelection);
  };

  return (
    <div className="relative">
      <NavigationButton
        direction="left"
        onClick={() => setTransformValue((prev) => Math.min(prev + 308, 0))}
      />
      <NavigationButton
        direction="right"
        onClick={() => setTransformValue((prev) => Math.max(prev - 308, -308 * 3))}
      />

      <div className="mb-8 py-1 overflow-hidden">
        <div
          style={{
            marginLeft: `${transformValue}px`,
            transition: "0.2s ease",
          }}
          className="flex gap-x-3 px-16">
          {weekends.map(({ month, year, dates }) => {
            if (dates.length > 6) {
              return (
                <Button
                  key={month + year}
                  variant="outline"
                  onClick={() => toggleDateSelection(dates)}
                  className={`p-5 [&_svg]:size-8 flex-col py-6 h-auto min-w-[130px] rounded-2xl font-normal border-none active:scale-95 transition-all duration-100 ${
                    dates.every((date) => selectedDates.includes(date))
                      ? "ring-2 ring-foreground bg-muted-foreground/5"
                      : "ring-1 ring-border hover:bg-background hover:ring-foreground"
                  }`}>
                  <Calendar className="text-muted-foreground" strokeWidth={1.5} />
                  <span className="font-medium">{month}</span>
                  <div>{year}</div>
                </Button>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

const NavigationButton = ({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) => (
  <Button
    onClick={onClick}
    variant="ghost"
    size="icon"
    className={`shadow border [&_svg]:size-5 absolute z-10 ${
      direction === "left" ? "left-[60px]" : "right-[60px]"
    } -top-8 -translate-y-1/2`}>
    {direction === "left" ? <ChevronLeft /> : <ChevronRight />}
  </Button>
);

export default TabsContentFlexible;
