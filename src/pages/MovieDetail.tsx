import MovieShow from "@/components/movie-showing/MovieShow";
import Comments from "@/components/movie/Comments";
import InfoMovie from "@/components/movie/InfoMovie";
import MovieSchedule from "@/components/MovieSchedule/MovieSchedule";
import { movies } from "@/data/movies";
import { useParams } from "react-router";

const MovieDetail = () => {
  const { movieId } = useParams();
  const movie = movies.find(
    (movie) => movie.id === parseInt(movieId || "0", 10)
  );

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-white">
        Không tìm thấy phim.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <InfoMovie {...movie} />
      <MovieSchedule />
      <Comments movieId={movie.id} />
      <MovieShow />
    </div>
  );
};

export default MovieDetail;
