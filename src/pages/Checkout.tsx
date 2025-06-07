import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";

// Dữ liệu mẫu cho trang checkout
const mockTicketData = {
  movie: "Avengers: Endgame",
  time: "19:30",
  date: "15/04/2024",
  cinema: "CGV Aeon Mall",
  room: "Phòng 7",
  seats: ["A1", "A2", "A3"],
  total: 450000,
  moviePoster:
    "https://image.tmdb.org/t/p/w500/5SiQsz5YCxZdCN5vhKdiQ2dQnr6.jpg",
  duration: "180 phút",
  format: "2D",
  language: "Tiếng Anh - Phụ đề Tiếng Việt",
  ticketId: "TICKET-2024-001",
  pricePerTicket: 150000, // Giá mỗi vé
  quantity: 3, // Số lượng vé
};

export default function Checkout() {
  const navigate = useNavigate();
  const [ticketInfo] = useState(mockTicketData);

  const handlePayment = () => {
    // Xử lý thanh toán ở đây
    toast.success("Thanh toán thành công!");
    navigate("/");
  };

  // Tạo dữ liệu cho mã QR
  const qrData = JSON.stringify({
    ticketId: ticketInfo.ticketId,
    movie: ticketInfo.movie,
    time: ticketInfo.time,
    date: ticketInfo.date,
    seats: ticketInfo.seats,
  });

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Thanh toán vé xem phim
      </h2>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-36 bg-gray-200 rounded">
                <img src={ticketInfo.moviePoster} alt="" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{ticketInfo.movie}</h3>
                <p className="text-gray-600">
                  {ticketInfo.duration} | {ticketInfo.format}
                </p>
                <p className="text-gray-600">{ticketInfo.language}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center">
              <div className="bg-white p-4 rounded-lg shadow">
                <QRCodeSVG value={qrData} size={200} />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Mã vé: {ticketInfo.ticketId}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Thông tin suất chiếu</h4>
              <div className="space-y-2">
                <p>
                  Rạp: <span className="font-medium">{ticketInfo.cinema}</span>
                </p>
                <p>
                  Phòng: <span className="font-medium">{ticketInfo.room}</span>
                </p>
                <p>
                  Thời gian:{" "}
                  <span className="font-medium">
                    {ticketInfo.time} - {ticketInfo.date}
                  </span>
                </p>
                <p>
                  Ghế:{" "}
                  <span className="font-medium">
                    {ticketInfo.seats.join(", ")}
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Thông tin thanh toán</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Giá vé:</span>
                  <span>{ticketInfo.pricePerTicket.toLocaleString()}đ/vé</span>
                </div>
                <div className="flex justify-between">
                  <span>Số lượng vé:</span>
                  <span>{ticketInfo.quantity} vé</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Tổng cộng:</span>
                  <span className="text-pink-500">
                    {ticketInfo.total.toLocaleString()}đ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handlePayment}
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors font-semibold"
          >
            Xác nhận thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
