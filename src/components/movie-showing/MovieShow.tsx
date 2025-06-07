import { movies } from "@/data/movies";
import { Star } from "lucide-react";
import { Link } from "react-router";

const MovieShow = () => {
  return (
    <div className="space-y-8 p-8">
      <h2 className="mb-2 flex-1 text-xl font-bold">Phim đang chiếu</h2>
      <div className="grid grid-cols-1 gap-4">
        {movies.map((movie) => (
          <div className="flex gap-4 items-start p-4" key={movie.id}>
            <Link
              to={`/movie/${movie.id}`}
              className="flex-shrink-0 hover:scale-105 transition-transform duration-200"
            >
              <img
                src={movie.image}
                alt={movie.name}
                className="w-24 h-36 object-cover rounded-lg shadow-md"
              />
            </Link>
            <div className="grid grid-cols-1 gap-2 pt-4">
              <Link
                to={`/movie/${movie.id}`}
                className="flex-shrink-0 hover:text-pink-400"
              >
                <h3 className="text-xl font-bold">{movie.name}</h3>
              </Link>
              <p className="text-sm text-gray-600">{movie.genre}</p>
              <div className="flex gap-1 items-center">
                <Star className="text-yellow-500 fill-yellow-400" size={15} />
                <span className="text-sm font-semibold">
                  {movie.rating ?? "?"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieShow;
