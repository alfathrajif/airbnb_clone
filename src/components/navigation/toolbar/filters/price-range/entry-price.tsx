import { Input } from "@/components/ui/input";
import useFiltersPriceRangeStore from "@/hooks/use-filters-price-range-store";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function EntryPrice() {
  const {
    printMinPrice,
    setPrintMinPrice,
    sliderMin,
    sliderMax,
    setSliderMinValue,
    printMaxPrice,
    setSliderMaxValue,
    setPrintMaxPrice,
  } = useFiltersPriceRangeStore(useShallow((state) => state));

  const [inputMinValue, setInputMinValue] = useState<string>(
    printMinPrice.toString()
  );
  const [isFocusedMin, setIsFocusedMin] = useState(false);
  const [inputMaxValue, setInputMaxValue] = useState<string>(
    printMaxPrice.toString()
  );
  const [isFocusedMax, setIsFocusedMax] = useState(false);

  useEffect(() => {
    setInputMinValue(printMinPrice.toString());
    setInputMaxValue(printMaxPrice.toString());
  }, [printMinPrice, printMaxPrice]);

  const handleValueChange = (
    type: "min" | "max",
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setValue(value);
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue)) {
      if (type === "min") {
        setSliderMinValue(parsedValue);
      } else {
        setSliderMaxValue(parsedValue);
      }
    }
  };

  const handleBlur = (
    type: "min" | "max",
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    setPrintValue: (value: number) => void,
    setSliderValue: (value: number) => void,
    otherValue: string | number,
    sliderValue: number
  ) => {
    const parsedInputValue = parseInt(inputValue, 10);
    const parsedOtherValue =
      typeof otherValue === "string" ? parseInt(otherValue, 10) : otherValue;

    const newValue =
      isNaN(parsedInputValue) ||
      (type === "min"
        ? parsedInputValue < sliderValue
        : parsedInputValue > sliderValue)
        ? sliderValue
        : type === "min" && parsedInputValue > parsedOtherValue
        ? parsedOtherValue
        : type === "max" && parsedInputValue < parsedOtherValue
        ? parsedOtherValue
        : parsedInputValue;

    setPrintValue(newValue);
    setSliderValue(newValue);
    setInputValue(newValue.toString());
    setIsFocusedMin(false);
    setIsFocusedMax(false);
  };

  return (
    <div className="flex justify-between">
      <div className="flex flex-col items-center gap-y-1">
        <label
          htmlFor="price-min"
          className="text-sm text-muted-foreground font-medium">
          Minimum
        </label>
        <label
          className={`flex items-center justify-center min-w-[70px] ring-1 rounded-full h-12 pl-5 pr-4 ${
            isFocusedMin ? "ring-2 ring-foreground" : "ring-border"
          }`}>
          <div className="flex items-center">
            <div className="mb-0.5 text-sm">Rp</div>
            <Input
              id="price-min"
              type="text"
              autoComplete="off"
              className="p-0 rounded-none border-none h-auto"
              style={{
                width: `${inputMinValue.length}ch`,
              }}
              value={inputMinValue}
              onChange={(e) =>
                handleValueChange("min", e.target.value, setInputMinValue)
              }
              onBlur={() =>
                handleBlur(
                  "min",
                  inputMinValue,
                  setInputMinValue,
                  setPrintMinPrice,
                  setSliderMinValue,
                  inputMaxValue,
                  sliderMin
                )
              }
              onFocus={() => setIsFocusedMin(true)}
            />
          </div>
        </label>
      </div>
      <div className="flex flex-col items-center gap-y-1">
        <label
          htmlFor="price-max"
          className="text-sm text-muted-foreground font-medium">
          Maximum
        </label>
        <label
          className={`flex items-center justify-center min-w-[70px] ring-1 rounded-full h-12 pl-5 pr-4 ${
            isFocusedMax ? "ring-2 ring-foreground" : "ring-border"
          }`}>
          <div className="flex items-center">
            <div className="mb-0.5 text-sm">Rp</div>
            <Input
              id="price-max"
              type="text"
              autoComplete="off"
              className="p-0 rounded-none border-none h-auto"
              style={{
                width: `${inputMaxValue.length}ch`,
              }}
              value={inputMaxValue}
              onChange={(e) =>
                handleValueChange("max", e.target.value, setInputMaxValue)
              }
              onBlur={() =>
                handleBlur(
                  "max",
                  inputMaxValue,
                  setInputMaxValue,
                  setPrintMaxPrice,
                  setSliderMaxValue,
                  inputMinValue,
                  sliderMax
                )
              }
              onFocus={() => setIsFocusedMax(true)}
            />
          </div>
        </label>
      </div>
    </div>
  );
}
