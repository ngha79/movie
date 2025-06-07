import React from "react";
import { listMovieComments } from "@/data/comments";
import Comment from "../reviews/Comment";

const Comments = ({ movieId }: { movieId: number }) => {
  const movie = listMovieComments.find((item) => item.id === movieId);

  if (!movie || !movie.comments.length) {
    return (
      <div className="mt-6 p-8">
        <h3 className="text-xl font-bold mb-3">Bình luận từ người xem</h3>
        <div className="text-gray-400 text-sm italic">
          Hiện tại chưa có bình luận nào. Hãy là người đầu tiên.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 p-8">
      <h3 className="text-lg font-bold mb-8">Bình luận từ người xem</h3>
      <div className="space-y-8">
        {movie.comments.map((comment) => (
          <Comment {...comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
