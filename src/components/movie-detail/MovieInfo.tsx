import { Card } from "@/components/ui/card";
import type { MovieItemProps } from "@/data/movies";

interface MovieInfoProps {
  movie: MovieItemProps;
}

export default function MovieInfo({ movie }: MovieInfoProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Đạo diễn</h3>
          <p>{movie.director}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Thể loại</h3>
          <p>{movie.genre}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Ngày khởi chiếu</h3>
          <p>{movie.releaseDate}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Đánh giá</h3>
          <p>{movie.rating.toFixed(1)}/10</p>
        </div>
      </div>
    </Card>
  );
}
