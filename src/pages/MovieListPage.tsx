import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Giả định sử dụng React Router hoặc tương tự cho việc điều hướng
// import { Link } from 'react-router-dom';

// Giả định cấu trúc dữ liệu cho một phim trong danh sách view chung
interface MovieListItem {
  id: string;
  title: string;
  generalReviewSnippet?: string; // Đoạn review tóm tắt
  averageRating?: number; // Rating trung bình
  posterUrl?: string; // URL ảnh poster
}

interface MovieListPageProps {
  movies: MovieListItem[];
}

const MovieListPage: React.FC<MovieListPageProps> = ({ movies }) => {
  // Hàm xử lý khi click vào phim (sẽ cần điều hướng)
  const handleMovieClick = (movieId: string) => {
    // Đây là nơi bạn sẽ sử dụng hook hoặc hàm từ thư viện routing
    // Ví dụ với React Router: navigate(`/review/${movieId}`);
    console.log(`Navigate to review page for movie ID: ${movieId}`);
    // Thay thế console.log bằng logic điều hướng thực tế của bạn
    window.location.href = `/review/${movieId}`;
  };

  return (
    <div className="movie-list-page p-4">
      <h1 className="text-2xl font-bold mb-6">
        Danh sách phim và đánh giá chung
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            onClick={() => handleMovieClick(movie.id)}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              {movie.posterUrl && (
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-16 h-24 object-cover rounded-md"
                />
              )}
              <div className="flex-1">
                <CardTitle>{movie.title}</CardTitle>
                {movie.averageRating !== undefined && (
                  <p className="text-sm text-gray-600">
                    Rating: {movie.averageRating}/10
                  </p>
                )}
              </div>
            </CardHeader>
            {movie.generalReviewSnippet && (
              <CardContent>
                <p className="text-sm text-gray-700">
                  {movie.generalReviewSnippet}
                </p>
              </CardContent>
            )}
          </Card>
        ))}
        {movies.length === 0 && (
          <p className="text-gray-500">Không có phim nào để hiển thị.</p>
        )}
      </div>
    </div>
  );
};

export default MovieListPage;
