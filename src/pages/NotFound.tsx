import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Không tìm thấy trang</h2>
      <p className="mb-6 text-gray-500">
        Trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
