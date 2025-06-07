import { Button } from "@/components/ui/button";
import type { MovieItemProps } from "@/data/movies";

interface MovieDetailHeroProps {
  movie: MovieItemProps;
}

export default function MovieDetailHero({ movie }: MovieDetailHeroProps) {
  return (
    <div className="relative h-[500px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.backgroundImage})`,
          filter: "blur(8px)",
        }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="flex gap-8">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-64 h-96 rounded-lg shadow-lg"
          />
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-red-500 text-white px-3 py-1 rounded">
                {movie.rating.toFixed(1)}
              </span>
              <span>{movie.genre}</span>
              <span>{movie.releaseDate}</span>
            </div>
            <p className="text-gray-200 mb-6 max-w-2xl">{movie.description}</p>
            <div className="flex gap-4">
              <Button size="lg">Mua vé</Button>
              <Button variant="outline" size="lg">
                Trailer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
