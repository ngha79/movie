import MovieFuture from "@/components/movie-showing/MovieFuture";
import MovieShowing from "@/components/movie-showing/MovieShowing";
import Reviews from "@/components/reviews/Reviews";
import { Check } from "lucide-react";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-2xl font-bold text-center mt-10">
          Mua vé xem phim Online
        </h1>
        <p className="text-center mt-4">
          Với nhiều ưu đãi hấp dẫn và kết nối với tất cả các rạp lớn phủ rộng
          khắp Việt Nam. Đặt vé ngay!
        </p>
        <ul>
          <li className="flex items-center mt-4 gap-2">
            <div className="bg-gray-300 rounded-full w-max p-1">
              <Check className="inline text-blue-500" />
            </div>
            Mua vé Online, trải nghiệm phim hay
          </li>
          <li className="flex items-center mt-4 gap-2">
            <div className="bg-gray-300 rounded-full w-max p-1">
              <Check className="inline text-blue-500" />
            </div>
            Đặt vé an toàn
          </li>
          <li className="flex items-center mt-4 gap-2">
            <div className="bg-gray-300 rounded-full w-max p-1">
              <Check className="inline text-blue-500" />
            </div>
            Tha hồ chọn chỗ ngồi, mua bắp nước tiện lợi.
          </li>
          <li className="flex items-center mt-4 gap-2">
            <div className="bg-gray-300 rounded-full w-max p-1">
              <Check className="inline text-blue-500" />
            </div>
            Lịch sử đặt vé được lưu lại ngay
          </li>
        </ul>
      </div>
      <MovieShowing />
      <MovieFuture />
      <Reviews />
    </div>
  );
};

export default Home;
