import type { MovieItemProps } from "@/data/movies";
import { Button } from "../ui/button";

const InfoMovie = (movie: MovieItemProps) => {
  return (
    <div className="relative z-[1] flex items-center justify-center bg-black py-4 text-white text-opacity-95 sm:py-6 min-h-screen">
      {/* Background image */}
      <div
        style={{
          backgroundImage: `url(${movie.backgroundImage || movie.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
        }}
        className="absolute top-0 left-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat"
        aria-hidden="true"
      />
      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-8 lg:px-8 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Poster */}
        <div className="w-40 md:w-64 flex-shrink-0 mb-4 md:mb-0">
          <img
            src={movie.image}
            alt={movie.name}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
            loading="lazy"
          />
        </div>
        {/* Info */}
        <div className="flex-1">
          <h1 className="mt-2 text-2xl font-bold md:text-4xl">{movie.name}</h1>
          <ul className="mt-1 flex flex-wrap items-center text-xs text-white text-opacity-60 md:text-sm">
            <li>{movie.title}</li>
            <li className="mx-2 font-normal">·</li>
            <li>{new Date(movie.releaseDate).getFullYear()}</li>
            <li className="mx-2 font-normal">·</li>
            <li>{movie.genre}</li>
          </ul>
          <div className="mt-3 text-sm text-white text-opacity-80">
            <span className="font-bold">Đạo diễn:</span> {movie.director}
          </div>
          <div className="mt-3 text-sm text-white text-opacity-80">
            <span className="font-bold">Nội dung:</span>
            <p className="mt-1 text-gray-300">{movie.description}</p>
          </div>
          <div className="mt-3 flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-xs">
              <span className="font-bold">Đánh giá:</span>
              <span className="text-yellow-400 font-semibold">
                {movie.rating ?? "?"}
              </span>
              <span className=" text-white/60">/ 10</span>
            </div>
            <div className="text-xs">
              <span className="font-bold">Ngày chiếu:</span>{" "}
              {new Date(movie.releaseDate).toLocaleDateString("vi-VN")}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Button variant={"secondary"}>Xem trailer</Button>
            <Button variant={"secondary"}>Xem Review</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoMovie;
