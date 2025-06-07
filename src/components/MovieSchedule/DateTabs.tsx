import React from "react";
import { Button } from "@/components/ui/button";

export interface DateType {
  key: string;
  label: string;
  date: string;
}

interface DateTabsProps {
  dates: DateType[];
  selectedDate: string;
  onSelect: (dateKey: string) => void;
}

export const DateTabs: React.FC<DateTabsProps> = ({
  dates,
  selectedDate,
  onSelect,
}) => {
  return (
    <div className="flex gap-2 mt-4 mb-4 overflow-x-auto">
      {dates.map((d) => (
        <Button
          key={d.key}
          variant={selectedDate === d.key ? "default" : "outline"}
          size="sm"
          className="flex flex-col items-center min-w-[48px] h-max p-4"
          onClick={() => onSelect(d.key)}
        >
          <span className="font-bold text-base">{d.date}</span>
          <span className="text-xs">{d.label}</span>
        </Button>
      ))}
    </div>
  );
};
