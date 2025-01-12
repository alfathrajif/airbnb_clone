import React, { useState } from "react";
import styles from "./toolbar-filters.module.scss";
import { products } from "@/constants";

interface ChartData {
  label: string;
  value: number;
}

interface BarChartProps {
  data: ChartData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const maxDataValue = Math.max(...data.map((item: ChartData) => item.value));

  return (
    <div className={styles.chart__container}>
      <div className="h-full flex items-end gap-x-[2px] px-5">
        {data.map((item: ChartData, index: number) => (
          <div
            key={index}
            style={{
              height: `${(item.value / maxDataValue) * 100}%`,
            }}
            className={styles.chart__bar}
          />
        ))}
      </div>
      <div className={styles.chart__axis} />
    </div>
  );
};

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

export default function PriceRange() {
  const [minPrice, setMinPrice] = useState(160_000);
  const [maxPrice, setMaxPrice] = useState(2_700_000);

  const calculateStep = (max: number, min: number) => {
    const range = max - min;
    const idealStep = range / 47; // You can adjust the divisor to change the number of bars
    return Math.ceil(idealStep);
  };

  const step = calculateStep(maxPrice, minPrice);

  const calculateValues = (min: number, max: number, step: number) => {
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

  const values = calculateValues(minPrice, maxPrice, step);

  const chartData = generatePriceRangeData(
    minPrice,
    maxPrice,
    step,
    values
  ).sort(
    (a, b) =>
      parseInt(a.label.split(" - ")[0].replace("$", "")) -
      parseInt(b.label.split(" - ")[0].replace("$", ""))
  );

  return (
    <div className={styles.item}>
      <div>
        <div className={styles.item__title}>Price range</div>
        <div>Nightly prices before fees and taxes</div>
      </div>
      <BarChart data={chartData} />
    </div>
  );
}
