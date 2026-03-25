"use client";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

type SettingsProps = {
  width: number;
  height: number;
  value: number;
};

export default function ArcDesign({ width, height, value }: SettingsProps) {
  return (
    <Gauge
      width={width}
      height={height}
      value={value}
      cornerRadius="50%"
      text="" 
      sx={(theme) => ({
        [`& .${gaugeClasses.valueArc}`]: {
          fill: "#22C55E",
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.grey[800],
        },
      })}
    />
  );
}