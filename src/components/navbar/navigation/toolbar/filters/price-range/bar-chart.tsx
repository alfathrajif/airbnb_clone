import { ChartDataType } from "@/types";
import priceRangeStyles from "./price-range.module.scss";
import useFiltersPriceRangeStore from "@/hooks/use-filters-price-range-store";
import { useShallow } from "zustand/shallow";
import Slider from "rc-slider";
import "./slider.scss";

interface BarChartProps {
  data: ChartDataType[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const {
    sliderMin,
    sliderMax,
    setPrintMinPrice,
    sliderMinValue,
    setSliderMinValue,
    sliderMaxValue,
    setSliderMaxValue,
    setPrintMaxPrice,
  } = useFiltersPriceRangeStore(useShallow((state) => state));

  const maxDataValue = Math.max(
    ...data.map((item: ChartDataType) => item.value)
  );

  const handleSliderChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      const [minValue, maxValue] = values;

      // Pastikan minValue <= maxValue
      if (minValue <= maxValue) {
        setSliderMinValue(minValue);
        setPrintMinPrice(minValue);
        setSliderMaxValue(maxValue);
        setPrintMaxPrice(maxValue);
      }
    }
  };

  return (
    <div className={priceRangeStyles.chart__container}>
      <div className="h-full flex items-end gap-x-[2px] px-5">
        {data.map((item, index) => {
          const rangeStep = (sliderMax - sliderMin) / data.length;
          const elementMinValue = sliderMin + rangeStep * index;
          const elementMaxValue = elementMinValue + rangeStep;

          const isWithinRange =
            elementMinValue >= sliderMinValue &&
            elementMaxValue <= sliderMaxValue;

          const backgroundColor = isWithinRange
            ? "hsl(var(--primary))" // Warna utama
            : "hsl(var(--border))"; // Warna alternatif

          const heightPercentage = (item.value / maxDataValue) * 100;

          return (
            <div
              key={index}
              style={{
                height: `${heightPercentage}%`,
                backgroundColor,
              }}
              className={priceRangeStyles.chart__bar}
            />
          );
        })}
      </div>
      <div
        className="relative mx-auto"
        style={{
          width: "calc(100% - 30px)",
        }}>
        <Slider
          className="absolute bottom-2"
          range
          min={sliderMin}
          max={sliderMax}
          step={20000}
          value={[sliderMinValue, sliderMaxValue]}
          defaultValue={[sliderMin, sliderMax]}
          onChange={handleSliderChange}
          allowCross={false}
        />
      </div>
    </div>
  );
};

export default BarChart;
