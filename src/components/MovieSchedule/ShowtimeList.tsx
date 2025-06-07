import React from "react";
import { Button } from "@/components/ui/button";

interface ShowtimeListProps {
  showtimes: string[];
  subtitle?: string;
  onSelectShowtime?: (showtime: string) => void;
}

export const ShowtimeList: React.FC<ShowtimeListProps> = ({
  showtimes,
  subtitle,
  onSelectShowtime,
}) => {
  return (
    <div className="mt-2">
      {subtitle && <div className="text-sm font-medium mb-1">{subtitle}</div>}
      <div className="flex gap-2">
        {showtimes.length > 0 ? (
          showtimes.map((st, i) => (
            <Button
              key={i}
              variant="secondary"
              size="sm"
              onClick={() => onSelectShowtime?.(st)}
            >
              {st}
            </Button>
          ))
        ) : (
          <span className="text-xs text-gray-400">Chưa có suất chiếu</span>
        )}
      </div>
    </div>
  );
};
