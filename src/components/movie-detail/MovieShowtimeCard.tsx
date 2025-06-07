import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Theater {
  id: number;
  name: string;
  logo: string;
}

interface Showtime {
  time: string;
  format: string;
}

interface MovieShowtimeCardProps {
  theater: Theater;
  showtimes: Showtime[];
}

export default function MovieShowtimeCard({
  theater,
  showtimes,
}: MovieShowtimeCardProps) {
  return (
    <Card key={theater.id} className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <img src={theater.logo} alt={theater.name} className="w-8 h-8" />
        <h3 className="font-semibold">{theater.name}</h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {showtimes.map((showtime, index) => (
          <Button key={index} variant="outline" className="w-full">
            {showtime.time}
          </Button>
        ))}
      </div>
    </Card>
  );
}
