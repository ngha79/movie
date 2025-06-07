import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Movie } from "@/types/movie";
import { useNavigate } from "react-router-dom";

export default function TopMovies() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // TODO: Fetch data from API
    // Mock data
    const mockMovies: Movie[] = [
      {
        id: "1",
        title: "Avengers: Endgame",
        poster: "/path/to/poster.jpg",
        description: "Description",
        duration: 180,
        releaseDate: "2024-03-20",
        genre: ["Action", "Adventure"],
        rating: 4.5,
        director: "Director Name",
        cast: ["Actor 1", "Actor 2"],
        language: "Tiếng Anh - Phụ đề Tiếng Việt",
        status: "now_showing",
      },
      // Add more mock data
    ];

    // Sort movies by rating
    const sortedMovies = [...mockMovies].sort((a, b) => b.rating - a.rating);
    setMovies(sortedMovies);
  }, []);

  const handleMovieClick = (movieId: string) => {
    navigate(`/cinema/movie/${movieId}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Top Phim Đánh Giá Cao</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <Card
            key={movie.id}
            className="hover:shadow-lg transition-shadow cursor-pointer relative"
            onClick={() => handleMovieClick(movie.id)}
          >
            <div className="absolute top-4 left-4 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full">
              #{index + 1}
            </div>
            <CardHeader>
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <CardTitle className="text-xl mt-4">{movie.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Thể loại:</span>{" "}
                  {movie.genre.join(", ")}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Đánh giá:</span>{" "}
                  {movie.rating}/5
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Thời lượng:</span>{" "}
                  {movie.duration} phút
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
