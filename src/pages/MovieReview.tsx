import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Comments from "@/components/movie/Comments";
import { listMovieComments } from "@/data/comments";
import { Star } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import MovieSchedule from "@/components/MovieSchedule/MovieSchedule";

const MovieReview = () => {
  const { movieId } = useParams<{ movieId?: string }>();

  const movie = listMovieComments.find(
    (item) => item.id === parseInt(movieId || "0", 10)
  );

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-gray-800">
        Không tìm thấy thông tin phim.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 lg:p-8 font-sans">
      <Link to={`/movie/${movie.id}`}>
        <Card className="mb-6 lg:mb-8 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer py-4">
          <CardContent className="p-4 flex flex-col lg:flex-row gap-4">
            <div className="flex-shrink-0 w-32 h-48 lg:w-40 lg:h-60 rounded-lg overflow-hidden shadow-sm">
              <img
                src={movie.image}
                alt={movie.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col justify-start">
              <CardTitle className="text-xl lg:text-2xl font-bold mb-1 text-[#333]">
                {movie.name}
              </CardTitle>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <Star
                  className="fill-yellow-400 text-yellow-400 mr-1"
                  size={16}
                />
                <span className="font-bold mr-4">
                  {movie.rating?.toFixed(1)}/10
                </span>
              </div>

              <div className="review-content text-gray-700 text-sm leading-relaxed line-clamp-3">
                <p>{movie.review}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
      <MovieSchedule />
      <Comments movieId={movie.id} />
    </div>
  );
};

export default MovieReview;
