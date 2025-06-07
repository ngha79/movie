import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Giả định cấu trúc dữ liệu cho một phim trong danh sách
interface MovieWithReviews {
  id: string;
  title: string;
  // Thêm các thông tin phim khác nếu cần
  reviews: ViewerReview[];
}

// Giả định cấu trúc dữ liệu cho một bình luận của người xem
interface ViewerReview {
  id: string;
  reviewerName: string;
  reviewDate: string;
  content: string;
  avatarUrl?: string;
  // Thêm các thông tin bình luận khác nếu cần (ví dụ: rating)
}

interface MovieReviewsListProps {
  movies: MovieWithReviews[];
}

const MovieReviewsList: React.FC<MovieReviewsListProps> = ({ movies }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Danh sách đánh giá phim</h1>
      <div className="grid gap-6">
        {movies.map((movie) => (
          <Card key={movie.id}>
            <CardHeader>
              <CardTitle>{movie.title}</CardTitle>
              {/* Thêm thông tin tóm tắt phim tại đây nếu có */}
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold mb-4">
                Bình luận từ người xem
              </h3>
              <div className="grid gap-4">
                {movie.reviews.map((review) => (
                  <Card key={review.id} className="p-4">
                    <div className="flex items-center space-x-4 mb-2">
                      <Avatar>
                        <AvatarImage
                          src={review.avatarUrl || "/placeholder-avatar.jpg"}
                          alt={review.reviewerName}
                        />
                        <AvatarFallback>
                          {review.reviewerName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{review.reviewerName}</p>
                        <span className="block text-sm text-gray-600 mt-1">
                          {review.reviewDate}
                        </span>
                      </div>
                    </div>
                    <p>{review.content}</p>
                    {/* Thêm các nút tương tác (like, reply) nếu cần */}
                  </Card>
                ))}
                {movie.reviews.length === 0 && (
                  <p className="text-gray-500">
                    Chưa có bình luận nào cho phim này.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {movies.length === 0 && (
          <p className="text-gray-500">Không có phim nào để hiển thị.</p>
        )}
      </div>
    </div>
  );
};

export default MovieReviewsList;
