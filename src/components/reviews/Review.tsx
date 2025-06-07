import type { MovieCommentItemProps } from "@/data/comments";
import { MessageCircle, Star } from "lucide-react";
import Comment from "./Comment";
import { Link } from "react-router";

const Review = (movie: MovieCommentItemProps) => {
  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
      <div className=" relative z-[1] aspect-[16/11] w-full overflow-hidden  bg-gray-200 bg-cover  bg-no-repeat  ">
        <img
          className="absolute left-0 top-0 z-0 flex h-full w-full"
          src={movie.image}
        />
        <div className="absolute bottom-0 left-0 right-0 flex h-3/4 flex-col-reverse bg-gradient-to-t from-black/75 via-black/20 p-3">
          <p className="font-bold text-white">{movie.name}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="fill-yellow-400 text-yellow-400" />
              <span className="text-white text-xs">{movie.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="text-white" />
              <span className="text-white text-xs">
                {movie.total} bình luận
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-4 px-4 py-5">
        {movie.comments.map(
          ({ createdAt, id, movieId, review, star, user }) => (
            <Comment
              createdAt={createdAt}
              id={id}
              movieId={movieId}
              user={user}
              review={review}
              star={star}
            />
          )
        )}
        <Link
          to={`/movie/${movie.id}/comments`}
          className="flex cursor-pointer  items-center space-x-1 pl-10 text-xs font-bold underline hover:text-pink-500"
        >
          <span>Xem thêm</span>{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            className="h-4 w-4 opacity-60"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Review;
