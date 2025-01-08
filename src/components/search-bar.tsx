"use client";
import { Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface OptionButtonProps {
  option: "stays" | "experiences";
  selectedOption: string;
  onClick: (option: "stays" | "experiences") => void;
  label: string;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

interface SectionCardProps {
  sectionKey: string;
  clickedSection: string;
  hoveredSection: string;
  isContainerActive: boolean;
  setClickedSection: (section: string) => void;
  setHoveredSection: (section: string) => void;
  setIsContainerActive: (active: boolean) => void;
  title: string;
  description: string;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  selectedOption,
  onClick,
  label,
  buttonRef,
}) => (
  <Button
    ref={buttonRef}
    variant="ghost"
    size="lg"
    onClick={() => onClick(option)}
    className={`text-base px-4 ${
      selectedOption === option ? "font-semibold" : "text-muted-foreground"
    }`}>
    {label}
  </Button>
);

const SectionCard: React.FC<SectionCardProps> = ({
  sectionKey,
  clickedSection,
  setClickedSection,
  setHoveredSection,
  setIsContainerActive,
  title,
  description,
}) => (
  <div
    className={`relative rounded-full w-full cursor-pointer ${
      clickedSection === sectionKey ? "shadow-md" : ""
    }`}
    onClick={() => {
      setClickedSection(sectionKey);
      setIsContainerActive(true);
    }}
    onMouseEnter={() => setHoveredSection(sectionKey)}
    onMouseLeave={() => setHoveredSection("")}>
    <div
      className={`pl-7 py-3.5 rounded-full ${
        clickedSection === sectionKey
          ? "bg-white hover:bg-white"
          : "hover:bg-accent"
      }`}>
      <div className="text-xs font-semibold">{title}</div>
      <div className="text-sm text-muted-foreground font-medium">
        {description}
      </div>
    </div>
  </div>
);

export default function SearchBar() {
  const [hoveredSection, setHoveredSection] = useState<string>("");
  const [clickedSection, setClickedSection] = useState<string>("");
  const [isContainerActive, setIsContainerActive] = useState<boolean>(false);
  const [option, setOption] = useState<"stays" | "experiences">("stays");

  const containerRef = useRef<HTMLDivElement>(null);
  const staysButtonRef = useRef<HTMLButtonElement>(null);
  const experiencesButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        staysButtonRef.current !== target &&
        experiencesButtonRef.current !== target &&
        !staysButtonRef.current?.contains(target) &&
        !experiencesButtonRef.current?.contains(target)
      ) {
        setClickedSection("");
        setIsContainerActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOptionChange = (newOption: "stays" | "experiences") => {
    if (option !== newOption) {
      setOption(newOption);
      if (clickedSection !== "where") setClickedSection("");
    }
  };

  return (
    <div className="w-full max-w-[850px] flex flex-col justify-evenly absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex justify-center mb-4">
        <OptionButton
          option="stays"
          selectedOption={option}
          onClick={handleOptionChange}
          label="Stays"
          buttonRef={staysButtonRef}
        />
        <OptionButton
          option="experiences"
          selectedOption={option}
          onClick={handleOptionChange}
          label="Experiences"
          buttonRef={experiencesButtonRef}
        />
      </div>
      <div
        ref={containerRef}
        className={`relative border border-zinc-300 shadow-md rounded-full flex items-center justify-between ${
          isContainerActive ? "bg-zinc-200 shadow-none" : ""
        }`}>
        {/* Where Section */}
        <SectionCard
          sectionKey="where"
          clickedSection={clickedSection}
          isContainerActive={isContainerActive}
          setClickedSection={setClickedSection}
          hoveredSection={hoveredSection}
          setHoveredSection={setHoveredSection}
          setIsContainerActive={setIsContainerActive}
          title="Where"
          description="Search destinations"
        />
        <Separator
          orientation="vertical"
          className={`h-8 ${
            hoveredSection === "where" || hoveredSection === "checkin"
              ? "bg-transparent"
              : clickedSection === "where" || clickedSection === "checkin"
              ? "bg-transparent"
              : "bg-zinc-300"
          }`}
        />
        {/* Check in & Check out Section */}
        {option === "stays" ? (
          <div className="w-full flex items-center cursor-pointer">
            <SectionCard
              sectionKey="checkin"
              clickedSection={clickedSection}
              hoveredSection={hoveredSection}
              isContainerActive={isContainerActive}
              setClickedSection={setClickedSection}
              setHoveredSection={setHoveredSection}
              setIsContainerActive={setIsContainerActive}
              title="Check in"
              description="Add dates"
            />
            <Separator
              orientation="vertical"
              className={`h-8 ${
                hoveredSection === "checkin" || hoveredSection === "checkout"
                  ? "bg-transparent"
                  : clickedSection === "checkin" ||
                    clickedSection === "checkout"
                  ? "bg-transparent"
                  : "bg-zinc-300"
              }`}
            />
            <SectionCard
              sectionKey="checkout"
              hoveredSection={hoveredSection}
              clickedSection={clickedSection}
              isContainerActive={isContainerActive}
              setClickedSection={setClickedSection}
              setHoveredSection={setHoveredSection}
              setIsContainerActive={setIsContainerActive}
              title="Check out"
              description="Add dates"
            />
          </div>
        ) : (
          <div className="w-full cursor-pointer">
            <SectionCard
              sectionKey="date"
              clickedSection={clickedSection}
              isContainerActive={isContainerActive}
              hoveredSection={hoveredSection}
              setClickedSection={setClickedSection}
              setHoveredSection={setHoveredSection}
              setIsContainerActive={setIsContainerActive}
              title="Date"
              description="Add dates"
            />
          </div>
        )}
        <Separator
          orientation="vertical"
          className={`h-8 ${
            hoveredSection === "checkout" || hoveredSection === "who"
              ? "bg-transparent"
              : clickedSection === "checkin" || clickedSection === "checkout"
              ? "bg-transparent"
              : "bg-zinc-300"
          }`}
        />
        <SectionCard
          sectionKey="who"
          clickedSection={clickedSection}
          hoveredSection={hoveredSection}
          isContainerActive={isContainerActive}
          setClickedSection={setClickedSection}
          setHoveredSection={setHoveredSection}
          setIsContainerActive={setIsContainerActive}
          title="Who"
          description="Add guests"
        />
        <Button className="absolute w-12 h-12 top-1/2 right-2 -translate-y-1/2">
          <Search size={60} strokeWidth={4} />
        </Button>
      </div>
    </div>
  );
}
