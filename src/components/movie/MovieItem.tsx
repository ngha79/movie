import { Star } from "lucide-react";
import { Link } from "react-router";

interface MovieItemProps {
  image: string;
  name: string;
  rating?: number;
  type: string;
  id: number;
  theme?: "light" | "dark"; // Thêm prop theme
}

const MovieItem = ({
  id,
  image,
  name,
  type,
  rating,
  theme = "light", // Mặc định là sáng
}: MovieItemProps) => {
  const textColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <Link
      to={`/movie/${id}`}
      className={`flex flex-col hover:text-pink-400 group items-start justify-center w-full h-full bg-transparent rounded-lg ${textColor}`}
    >
      <img
        alt={name}
        src={image}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p
        className={`font-bold line-clamp-1 group-hover:text-pink-400 ${textColor}`}
      >
        {name}
      </p>
      <p className="text-sm text-gray-500  group-hover:text-pink-400 line-clamp-1">
        {type}
      </p>
      {rating && (
        <div className="flex items-center mt-2 gap-1">
          <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          <p className="text-xs">{rating}</p>
        </div>
      )}
    </Link>
  );
};

export default MovieItem;
