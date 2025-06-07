import { theaters, showtimes } from "@/data/showtimes";
import MovieShowtimeCard from "./MovieShowtimeCard";

export default function MovieShowtimes() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {theaters.map((theater) => (
        <MovieShowtimeCard
          key={theater.id}
          theater={theater}
          showtimes={showtimes}
        />
      ))}
    </div>
  );
}
