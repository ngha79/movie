import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface CinemaType {
  key: string;
  name: string;
  address: string;
  map: string;
  showtimes?: string[];
  subtitle?: string;
}

interface CinemaListProps {
  cinemas: CinemaType[];
  selectedCinema: string;
  onSelect: (cinemaKey: string) => void;
}

export const CinemaList: React.FC<CinemaListProps> = ({
  cinemas,
  selectedCinema,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-3">
      {cinemas.map((cinema) => (
        <Card
          key={cinema.key}
          className={`p-3 cursor-pointer border-2 ${
            selectedCinema === cinema.key
              ? "border-primary"
              : "border-transparent"
          }`}
          onClick={() => onSelect(cinema.key)}
        >
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-xs px-2 py-1">
              {cinema.name}
            </Badge>
            <a
              href={cinema.map}
              className="text-xs text-blue-600 underline ml-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              [Bản đồ]
            </a>
          </div>
          <div className="text-xs text-muted-foreground mb-2">
            {cinema.address}
          </div>
        </Card>
      ))}
    </div>
  );
};
