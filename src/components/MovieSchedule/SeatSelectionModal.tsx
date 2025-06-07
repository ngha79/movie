import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Data fake cho sơ đồ ghế
const seatRows = [
  { row: "A", seats: 18 },
  { row: "B", seats: 18 },
  { row: "C", seats: 18 },
  { row: "D", seats: 18 },
  { row: "E", seats: 18 },
  { row: "F", seats: 18 },
  { row: "G", seats: 18 },
  { row: "H", seats: 18 },
  { row: "S", seats: 18 },
];

const seatPrice = 75000;

interface SeatSelectionModalProps {
  open: boolean;
  onClose: () => void;
  showtimeInfo: {
    movie: string;
    time: string;
    date: string;
    cinema: string;
    room: string;
    subtitle: string;
  };
  onSubmit: (selectedSeats: string[]) => void;
}

export const SeatSelectionModal: React.FC<SeatSelectionModalProps> = ({
  open,
  onClose,
  showtimeInfo,
  onSubmit,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSelectSeat = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length < 6) {
        setSelectedSeats([...selectedSeats, seat]);
      } else {
        toast.error("Bạn chỉ được chọn tối đa 6 ghế!");
      }
    }
  };

  const handleBuy = () => {
    if (selectedSeats.length > 0) {
      onSubmit(selectedSeats);
      setSelectedSeats([]);
    }
  };

  const isSelected = (seat: string) => selectedSeats.includes(seat);

  // Hàm kiểm tra ghế VIP
  const isVipSeat = (seat: string) => {
    const vipRows = ["D", "E", "F"];
    const match = seat.match(/^([A-Z]+)(\d+)$/);
    if (!match) return false;
    const row = match[1];
    const num = parseInt(match[2], 10);
    return vipRows.includes(row) && num >= 6 && num <= 13;
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(val) => {
        if (!val) onClose();
      }}
    >
      <SheetContent
        side="top"
        className="bg-[#23192b] rounded-lg p-6 w-full max-w-3xl mx-auto mt-22"
      >
        <SheetHeader>
          <SheetTitle className="text-center text-white text-lg font-semibold mb-2">
            Mua vé xem phim
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col items-center">
          <div className="mb-2 text-white">MÀN HÌNH</div>
          <div className="w-full flex flex-col items-center mb-4">
            {seatRows.map((row) => (
              <div key={row.row} className="flex gap-1 mb-1">
                {Array.from({ length: row.seats }).map((_, idx) => {
                  const seat = `${row.row}${idx + 1}`;
                  const vip = isVipSeat(seat);
                  return (
                    <button
                      key={seat}
                      className={`w-8 h-8 rounded-md text-xs font-bold
                        ${
                          isSelected(seat)
                            ? "bg-pink-400 text-white"
                            : vip
                            ? "bg-amber-400 text-black"
                            : "bg-violet-700 text-white"
                        }
                        hover:bg-pink-300
                      `}
                      onClick={() => handleSelectSeat(seat)}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-xs mb-4 text-white">
            <div className="flex items-center gap-1">
              <span
                className="w-4 h-4 bg-pink-400 inline-block rounded"
                text-white
              ></span>{" "}
              Ghế bạn chọn
            </div>
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 bg-violet-700 inline-block rounded"></span>{" "}
              Ghế thường
            </div>
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 bg-amber-400 inline-block rounded"></span>{" "}
              Ghế VIP
            </div>
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 bg-gray-700 inline-block rounded"></span>{" "}
              Đã đặt
            </div>
          </div>
          <div className="bg-white rounded p-4 w-full max-w-xl mb-4">
            <div className="font-semibold mb-1">{showtimeInfo.movie}</div>
            <div className="text-sm mb-1">
              {showtimeInfo.time} - {showtimeInfo.date} - {showtimeInfo.cinema}{" "}
              - {showtimeInfo.room} - {showtimeInfo.subtitle}
            </div>
            <div className="text-sm mb-1">
              Chỗ ngồi:{" "}
              <span className="font-semibold">
                {selectedSeats.join(", ") || "Chưa chọn"}
              </span>
            </div>
            <div className="text-sm">
              Tạm tính:{" "}
              <span className="font-semibold text-pink-500">
                {selectedSeats.length * seatPrice}đ
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <SheetClose asChild>
              <Button variant="secondary" onClick={onClose}>
                Đóng
              </Button>
            </SheetClose>
            <Button
              variant="default"
              onClick={handleBuy}
              disabled={selectedSeats.length === 0}
            >
              Mua vé
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
