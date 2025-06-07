import type { CommentItemProps } from "@/data/comments";
import { Star } from "lucide-react";

const Comment = ({ createdAt, review, star, user }: CommentItemProps) => {
  return (
    <div className="relative flex flex-nowrap">
      <img
        src={user.avatar}
        className="z-2 overflow-hidden rounded-full object-cover h-8 w-8"
      />
      <div className="ml-2 flex-1">
        <div className="text-xs font-bold">
          {user.fullname}
          <div className=" inline-block text-xs font-normal text-gray-400 ">
            · {createdAt}
          </div>
          <div className="flex items-center gap-1 mt-0 mb-0 font-normal">
            <Star className="fill-yellow-400 text-yellow-400" size={16} />
            <span className="text-xs ml-1">{star}</span>
          </div>
        </div>
        <div className="mt-1 line-clamp-3 cursor-pointer whitespace-pre-wrap break-words text-sm text-gray-700 hover:text-gray-500">
          {review}
        </div>
      </div>
    </div>
  );
};

export default Comment;
