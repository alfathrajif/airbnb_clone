import { useShallow } from "zustand/shallow";
import stylesIndex from "./index.module.scss";
import stylesWhere from "./where.module.scss";
import React from "react";
import useNavbarStore from "@/hooks/use-navbar-store";
import { Input } from "@/components/ui/input";
import { experiencesDestinations, staysDestinations } from "@/constants";
import { iconMapping } from "@/constants/icon-mapping";
import { Button } from "@/components/ui/button";
import { MapPin, X } from "lucide-react";

export default function Where({
  isScrollOnStart,
  tabsContent,
}: {
  isScrollOnStart: boolean;
  tabsContent: string;
}) {
  const { isDropSearch, setHover, click, setClick } = useNavbarStore(
    useShallow((state) => ({
      isDropSearch: state.isDropSearch,
      setHover: state.setHover,
      click: state.click,
      setClick: state.setClick,
    }))
  );

  const [suggestedvalue, setSuggestedValue] = React.useState("");
  const [value, setValue] = React.useState("");

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSuggestedValue(e.target.value);
    setValue(e.target.value);
  };

  return (
    <div
      className={`${stylesIndex.tabs_content_item} ${
        (isDropSearch || isScrollOnStart) && stylesIndex.active
      }`}>
      <label>
        <div
          onMouseEnter={() => setHover("where")}
          onMouseLeave={() => setHover("")}
          className={`${stylesIndex.filterItem} ${click === "where" && stylesIndex.click} ${
            (click === "checkin" || click === "date" || click === "when") &&
            stylesIndex.hoverNeighborRight
          }`}>
          <div className="pl-3">
            <div className="text-[13px] font-medium">Where</div>
            <Input
              value={value.trim() ? value : suggestedvalue}
              onChange={(e) => handleChangeValue(e)}
              className={`h-auto p-0 border-0 shadow-none ${
                click.trim() && click !== "where"
                  ? "placeholder:text-foreground"
                  : "placeholder:text-muted-foreground"
              }`}
              onFocus={() => setClick("where")}
              placeholder="Search destinations"
            />
          </div>
          {click === "where" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setValue("");
                setSuggestedValue("");
              }}
              className={`[&_svg]:size-4 text-foreground w-7 h-7 z-10 hover:bg-muted-foreground/20 absolute right-4 mx-0 ${
                value.trim() || suggestedvalue.trim() ? "" : "hidden"
              }`}>
              <X />
            </Button>
          )}
        </div>
      </label>
      {click === "where" &&
        (tabsContent === "stays" ? (
          <ContentStays value={value} setValue={setValue} setSuggestedValue={setSuggestedValue} />
        ) : (
          <ContentExperiences
            value={value}
            setValue={setValue}
            setSuggestedValue={setSuggestedValue}
          />
        ))}
    </div>
  );
}

const ContentStays = ({
  value,
  setValue,
  setSuggestedValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setSuggestedValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { setClick } = useNavbarStore(
    useShallow((state) => ({
      setClick: state.setClick,
    }))
  );

  return (
    <div className={stylesWhere.content}>
      <div className={value.trim() ? "py-8 px-6" : stylesWhere.container}>
        {value.trim() ? (
          staysDestinations
            .filter((item) => item.location.toLowerCase().includes(value.toLowerCase()))
            .slice(0, 5).length > 0 ? (
            staysDestinations
              .filter((item) => item.location.toLowerCase().includes(value.toLowerCase()))
              .slice(0, 5)
              .map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => {
                    setValue(item.location);
                    setClick("checkin");
                  }}
                  className="whitespace-normal rounded-xl [&_svg]:size-9 hover:bg-muted-foreground/10 w-full h-auto flex items-center justify-start gap-x-4 p-2">
                  <div className="bg-slate-50 text-slate-600 min-w-14 min-h-14 rounded-lg flex items-center justify-center">
                    <MapPin strokeWidth={1} />
                  </div>
                  <div className="text-left">
                    <div className="text-[15px] font-normal">{item.location}</div>
                  </div>
                </Button>
              ))
          ) : (
            <div className="text-muted-foreground text-center p-2">No results found</div>
          )
        ) : (
          <>
            <div className="text-[13px] font-light px-2 mb-3">Suggested destinations</div>
            {staysDestinations.map((item, index) => {
              const Icon = iconMapping[item.icon];
              const suggestedValue = item.location.split(",")[0];
              return (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => {
                    setSuggestedValue(suggestedValue);
                    setClick("checkin");
                  }}
                  className="whitespace-normal [&_svg]:size-9 hover:bg-muted-foreground/10 w-full h-auto flex items-center justify-start gap-x-4 rounded-xl p-2">
                  <div
                    style={{ color: item.textColor, background: item.bgColor }}
                    className={`min-w-14 min-h-14 rounded-lg flex items-center justify-center`}>
                    {React.cloneElement(<Icon />, { strokeWidth: 1.3 })}
                  </div>
                  <div className="text-left">
                    <div className="text-[15px] font-medium">{item.location}</div>
                    <div className="text-sm font-normal text-muted-foreground">
                      {item.description}
                    </div>
                  </div>
                </Button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

const ContentExperiences = ({
  value,
  setValue,
  setSuggestedValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setSuggestedValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { setClick } = useNavbarStore(
    useShallow((state) => ({
      setClick: state.setClick,
    }))
  );

  return (
    <div className={stylesWhere.content}>
      <div className={value.trim() ? "py-8 px-6" : stylesWhere.container}>
        {value.trim() ? (
          experiencesDestinations
            .filter((item) => item.location.toLowerCase().includes(value.toLowerCase()))
            .slice(0, 5).length > 0 ? (
            experiencesDestinations
              .filter((item) => item.location.toLowerCase().includes(value.toLowerCase()))
              .slice(0, 5)
              .map((item, index) => {
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => {
                      setValue(item.location);
                      setClick("date");
                    }}
                    className="whitespace-normal [&_svg]:size-9 hover:bg-muted-foreground/10 w-full h-auto flex items-center justify-start gap-x-4 rounded-lg p-2">
                    <div className="bg-slate-50 text-slate-600 min-w-14 min-h-14 rounded-lg flex items-center justify-center">
                      <MapPin strokeWidth={1} />
                    </div>
                    <div className="text-left">
                      <div className="text-[15px] font-medium">{item.location}</div>
                    </div>
                  </Button>
                );
              })
          ) : (
            <div className="text-muted-foreground text-center p-2">No results found</div>
          )
        ) : (
          <>
            <div className="text-[13px] font-light px-2 mb-3">Suggested destinations</div>
            {experiencesDestinations.map((item, index) => {
              const Icon = iconMapping[item.icon];
              const suggestedValue = item.location.split(",")[0];
              return (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => {
                    setSuggestedValue(suggestedValue);
                    setClick("date");
                  }}
                  className="whitespace-normal [&_svg]:size-9 hover:bg-muted-foreground/10 w-full h-auto flex items-center justify-start gap-x-4 rounded-lg p-2">
                  <div
                    style={{ color: item.textColor, background: item.bgColor }}
                    className={`min-w-14 min-h-14 rounded-lg flex items-center justify-center`}>
                    {React.cloneElement(<Icon />, { strokeWidth: 1.3 })}
                  </div>
                  <div className="text-left">
                    <div className="text-[15px] font-medium">{item.location}</div>
                  </div>
                </Button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
