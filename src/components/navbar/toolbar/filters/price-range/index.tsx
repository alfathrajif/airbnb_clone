import React, { useEffect } from "react";
import filtersStyles from "../filters.module.scss";
import { products } from "@/constants";
import BarChart from "./bar-chart";
import { ChartData } from "@/types";
import useFiltersPriceRangeStore from "@/hooks/use-filters-price-range-store";
import { useShallow } from "zustand/shallow";
import EntryPrice from "./entry-price";

const generatePriceRangeData = (
  min: number,
  max: number,
  step: number,
  values: number[]
): ChartData[] => {
  return Array.from({ length: Math.ceil((max - min) / step) }, (_, index) => {
    const rangeStart = min + index * step;
    const rangeEnd = rangeStart + step;
    return {
      label: `$${rangeStart} - $${rangeEnd}`,
      value: values[index] ?? 0,
    };
  });
};

const calculateStep = (min: number, max: number) => {
  const range = max - min;
  const idealStep = range / 47; // You can adjust the divisor to change the number of bars
  return Math.ceil(idealStep);
};

const calculateValues = (min: number, max: number, step: number): number[] => {
  const productPrices = products.map((product) =>
    parseInt(product.price.replace("Rp", "").replace(/\./g, ""), 10)
  );

  return Array.from({ length: Math.ceil((max - min) / step) }, (_, index) => {
    const rangeStart = min + index * step;
    const rangeEnd = rangeStart + step;

    if (index === Math.ceil((max - min) / step) - 1) {
      return productPrices.filter(
        (price) => price >= rangeStart && price <= rangeEnd
      ).length;
    }

    return productPrices.filter(
      (price) => price >= rangeStart && price < rangeEnd
    ).length;
  });
};

export default function PriceRange() {
  const {
    sliderMin,
    sliderMax,
    setSliderMin,
    setSliderMax,
    setPrintMinPrice,
    setPrintMaxPrice,
  } = useFiltersPriceRangeStore(useShallow((state) => state));

  useEffect(() => {
    const newSliderMin = 160_000;
    const newSliderMax = 2_700_000;

    if (sliderMin !== newSliderMin) {
      setSliderMin(newSliderMin);
      setPrintMinPrice(newSliderMin);
    }

    if (sliderMax !== newSliderMax) {
      setSliderMax(newSliderMax);
      setPrintMaxPrice(newSliderMax);
    }
  }, [
    sliderMin,
    sliderMax,
    setSliderMax,
    setSliderMin,
    setPrintMinPrice,
    setPrintMaxPrice,
  ]);

  const step = calculateStep(sliderMin, sliderMax);
  const values = calculateValues(sliderMin, sliderMax, step);

  const chartData = generatePriceRangeData(
    sliderMin,
    sliderMax,
    step,
    values
  ).sort(
    (a, b) =>
      parseInt(a.label.split(" - ")[0].replace("$", "")) -
      parseInt(b.label.split(" - ")[0].replace("$", ""))
  );

  return (
    <div className={filtersStyles.item}>
      <div>
        <div className={filtersStyles.item__title}>Price range</div>
        <div>Nightly prices before fees and taxes</div>
      </div>
      <div className="space-y-8 mb-2">
        <BarChart data={chartData} />
        <EntryPrice />
      </div>
    </div>
  );
}
