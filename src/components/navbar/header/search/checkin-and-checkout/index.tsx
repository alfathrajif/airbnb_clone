import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useNavbarStore from "@/hooks/use-navbar-store";
import { useWhenStore } from "@/hooks/use-when-store";
import { useShallow } from "zustand/shallow";
import stylesIndex from "../index.module.scss";
import stylesCheckinAndCheckout from "./checkin-and-checkout.module.scss";
import TabsContentDates from "./tabs-content-dates";
import TabsContentFlexible from "./tabs-content-flexible";
import TabsContentMonths from "./tabs-content-months";

const TABS_OPTIONS = [
  { label: "Dates", value: "dates" },
  { label: "Months", value: "months" },
  { label: "Flexible", value: "flexible" },
];

export default function CheckinAndCheckout({ isScrollOnStart }: { isScrollOnStart: boolean }) {
  const { isDropSearch, hover, setHover, click, setClick, tabsCheckInOut, setTabsCheckInOut } =
    useNavbarStore(
      useShallow((state) => ({
        isDropSearch: state.isDropSearch,
        hover: state.hover,
        setHover: state.setHover,
        click: state.click,
        setClick: state.setClick,
        tabsCheckInOut: state.tabsCheckInOut,
        setTabsCheckInOut: state.setTabsCheckInOut,
      }))
    );

  const handleTabChange = (value: string) => {
    setTabsCheckInOut(value);
    setClick(value === "dates" ? (click === "checkout" ? "checkout" : "checkin") : "when");
  };

  const renderTabContent = () => (
    <div className={stylesCheckinAndCheckout.content}>
      <div className={stylesCheckinAndCheckout.container}>
        <Tabs
          onValueChange={handleTabChange}
          defaultValue={tabsCheckInOut}
          className={stylesCheckinAndCheckout.tabs}>
          <TabsList className="flex h-fit rounded-full max-w-sm mx-auto p-1.5 gap-x-1.5 bg-muted-foreground/15">
            {TABS_OPTIONS.map(({ label, value }) => (
              <TabsTrigger
                key={value}
                value={value}
                className={`text-base w-full ${
                  tabsCheckInOut === value
                    ? "shadow hover:bg-background"
                    : "hover:bg-muted-foreground/20 text-foreground font-medium"
                }`}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-10">
            <TabsContentMonths />
            <TabsContentDates />
            <TabsContentFlexible />
          </div>
        </Tabs>
      </div>
    </div>
  );

  return (
    <div
      className={`${stylesIndex.tabs_content_item} ${
        (isDropSearch || isScrollOnStart) && stylesIndex.active
      }`}>
      <div className="flex items-center h-full">
        {tabsCheckInOut !== "dates" ? (
          <>
            <Separator
              orientation="vertical"
              className={`h-8 ${
                (["where", "when"].includes(click) ||
                  ["where", "when"].includes(hover) ||
                  tabsCheckInOut !== "dates") &&
                "bg-transparent"
              }`}
            />
            <div
              onMouseEnter={() => setHover("when")}
              onMouseLeave={() => setHover("")}
              onClick={() => {
                setClick("when");
              }}
              className={`${stylesIndex.filterItem} ${click === "when" && stylesIndex.click} ${
                click === "where" && stylesIndex.hoverNeighborLeft
              }  ${
                (click === "checkout" && tabsCheckInOut === "dates") ||
                (click === "who" && stylesIndex.hoverNeighborRight)
              }`}>
              <div>
                <div className="text-[13px] font-medium">When</div>
                <AddDates tabsCheckInOut={tabsCheckInOut} click={click} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              onMouseEnter={() => setHover("checkin")}
              onMouseLeave={() => setHover("")}
              onClick={() => setClick("checkin")}
              className={`${stylesIndex.filterItem} ${click === "checkin" && stylesIndex.click} ${
                click === "where" && stylesIndex.hoverNeighborLeft
              } ${click === "checkout" && stylesIndex.hoverNeighborRight}`}>
              <div>
                <div className="text-[13px] font-medium">Check in</div>
                <div
                  className={`text-sm ${
                    click.trim() && click !== "checkin"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}>
                  Add dates
                </div>
              </div>
            </div>
            <Separator
              orientation="vertical"
              className={`h-8 ${
                (["checkin", "checkout"].includes(click) ||
                  ["checkin", "checkout"].includes(hover)) &&
                "bg-transparent"
              }`}
            />
            <div
              onMouseEnter={() => setHover("checkout")}
              onMouseLeave={() => setHover("")}
              onClick={() => setClick("checkout")}
              className={`${stylesIndex.filterItem} ${click === "checkout" && stylesIndex.click} ${
                click === "checkin" && stylesIndex.hoverNeighborLeft
              } ${click === "who" && stylesIndex.hoverNeighborRight}`}>
              <div>
                <div className="text-[13px] font-medium">Check out</div>
                <div
                  className={`text-sm ${
                    click.trim() && click !== "checkout"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}>
                  Add dates
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {["checkin", "checkout", "when"].includes(click) && renderTabContent()}
    </div>
  );
}

const AddDates = ({ tabsCheckInOut, click }: { tabsCheckInOut: string; click: string }) => {
  const { tabsFlexible } = useNavbarStore(
    useShallow((state) => ({ tabsFlexible: state.tabsFlexible }))
  );

  const { selectedMonths } = useWhenStore(
    useShallow((state) => ({ selectedMonths: state.selectedMonths }))
  );

  if (tabsCheckInOut === "dates") {
    return (
      <div
        className={`text-sm ${
          click.trim() && click !== "checkin" ? "text-foreground" : "text-muted-foreground"
        }`}>
        Add dates
      </div>
    );
  }

  if (tabsCheckInOut === "months") {
    return <div className="text-sm text-foreground font-medium">Add months</div>;
  }

  return (
    <div className="text-sm text-foreground font-medium overflow-hidden whitespace-nowrap text-ellipsis max-w-[220px]">
      {!selectedMonths.trim() && "Any "}
      <span className={selectedMonths ? "capitalize" : ""}>{tabsFlexible}</span>
      {selectedMonths && ` in ${selectedMonths}`}
    </div>
  );
};
