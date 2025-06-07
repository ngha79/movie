import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button"; // Loại bỏ import Button nếu không còn sử dụng

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-sm pt-10 mt-10">
      <div className="container mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Cột 1: MUA VÉ XEM PHIM */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            MUA VÉ XEM PHIM
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/today-showtimes"
                className="hover:text-red-400 transition-colors duration-200"
              >
                Lịch chiếu phim
              </Link>
            </li>
            <li>
              <Link
                to="/cinemas"
                className="hover:text-red-400 transition-colors duration-200"
              >
                Rạp chiếu phim
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="hover:text-red-400 transition-colors duration-200"
              >
                Phim chiếu rạp
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="hover:text-red-400 transition-colors duration-200"
              >
                Review phim
              </Link>
            </li>
            <li>
              <Link
                to="/top-movies"
                className="hover:text-red-400 transition-colors duration-200"
              >
                Top phim
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="hover:text-red-400 transition-colors duration-200"
              >
                Blog phim
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: THÔNG TIN LIÊN HỆ */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            CHĂM SÓC KHÁCH HÀNG
          </h3>
          <ul className="space-y-3">
            <li>
              Hotline:{" "}
              <span className="text-red-400 font-bold">1900 0000 00</span>{" "}
              (1.000đ/phút)
            </li>
            <li>
              Email:{" "}
              <a
                href="mailto:hotro@gmail.vn"
                className="underline hover:text-red-400"
              >
                hotro@gmail.vn
              </a>
            </li>
            <li>Tổng đài: 0123456789 - 0123456789</li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            HỢP TÁC DOANH NGHIỆP
          </h3>
          <ul className="space-y-3">
            <li>Hotline: 1900 636 652 (1.000đ/phút)</li>
            <li>
              Email:{" "}
              <a href="#" className="underline hover:text-red-400">
                merchant.care@gmail.vn
              </a>
            </li>
            <li>
              Website:{" "}
              <a href="#" className="underline hover:text-red-400">
                business.gmail.vn
              </a>
            </li>
          </ul>

          <h3 className="mt-6 text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            LIÊN HỆ TRUYỀN THÔNG
          </h3>
          <ul className="space-y-3">
            <li>
              Email:{" "}
              <a
                href="mailto:pr@gmail.vn"
                className="underline hover:text-red-400"
              >
                pr@gmail.vn
              </a>
            </li>
          </ul>
        </div>

        {/* Cột 4: KẾT NỐI / TẢI ỨNG DỤNG / CHỨNG NHẬN */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            KẾT NỐI VỚI CHÚNG TÔI
          </h3>
          <div className="flex space-x-3 mt-3">
            <a
              href="#"
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <img
                src="/icons/facebook.svg"
                alt="Facebook"
                className="w-6 h-6"
              />
            </a>
            <a
              href="#"
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <img
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                className="w-6 h-6"
              />
            </a>
            <a
              href="#"
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <img src="/icons/youtube.svg" alt="YouTube" className="w-6 h-6" />
            </a>
          </div>

          <h3 className="mt-6 text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            TẢI ỨNG DỤNG TRÊN ĐIỆN THOẠI
          </h3>
          <div className="flex flex-col items-center lg:items-start space-y-2 mt-3">
            <img
              src="/images/footer/qr-code-placeholder.png" // Placeholder for QR code
              alt="QR Code"
              className="w-32 h-auto"
            />
            <a
              href="#"
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <img
                src="/images/footer/app-store.svg"
                alt="App Store"
                className="w-28 h-auto"
              />
            </a>
            <a
              href="#"
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <img
                src="/images/footer/google-play.svg"
                alt="Google Play"
                className="w-28 h-auto"
              />
            </a>
          </div>

          <h3 className="mt-6 text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            ĐƯỢC CHỨNG NHẬN BỞI
          </h3>
          <img
            src="/images/footer/certification-badge.png" // Placeholder for certification badge
            alt="Certification Badge"
            className="w-28 h-auto mt-3 mx-auto lg:mx-0"
          />
        </div>
      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="bg-gray-800 text-gray-400 px-4 py-6 text-center border-t border-gray-700 mt-10">
        <div className="container mx-auto text-left flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <img
              src="/images/footer/moviebooking-logo-small.png" // Placeholder for small logo
              alt="MovieBooking Logo"
              className="h-10 w-auto"
            />
            <div>
              <p className="text-sm font-semibold text-gray-200">
                CÔNG TY CỔ PHẦN DỊCH VỤ ĐẶT VÉ TRỰC TUYẾN
              </p>
              <p className="text-xs text-gray-400">
                Trụ sở chính: Thành phố Hà Nội
              </p>
              <p className="text-xs text-gray-400">
                Tên thương hiệu: MovieBooking
              </p>
              <p className="text-xs text-gray-400">
                © Copyright MovieBooking 2024
              </p>
            </div>
          </div>
          <div className="text-right text-xs space-y-1">
            <p>
              Dịch vụ trung gian thanh toán được cấp phép bởi Ngân hàng Nhà nước
              cấp phép được cung ứng thông qua **Ứng dụng MovieBooking**
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
