import { listMovieComments } from "@/data/comments";
import Review from "./Review";
import { Link } from "react-router";

const Reviews = () => {
  return (
    <div className="container mx-auto flex flex-col gap-4 p-4">
      <h3 className="text-center font-bold text-2xl">Bình luận nổi bật</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 p-8">
        {listMovieComments.map((movie) => (
          <Review key={movie.id} {...movie} />
        ))}
      </div>
      <div className="pt-6 text-center">
        <button
          type="button"
          className="rounded-full border border-pink-600 py-1 pl-4 pr-6 font-semibold text-pink-700 transition-all hover:bg-pink-50 hover:text-pink-800"
        >
          <Link to={"/reviews"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 inline-block h-4 w-4 animate-bounce opacity-80"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Xem tiếp nhé !
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Reviews;
