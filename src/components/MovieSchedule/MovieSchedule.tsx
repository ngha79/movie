import { useState } from "react";
import { Card } from "@/components/ui/card";
import type { DateType } from "./DateTabs";
import { DateTabs } from "./DateTabs";
import { CinemaList } from "./CinemaList";
import { ShowtimeList } from "./ShowtimeList";
import { scheduleData } from "@/data/scheduleData";
import { SeatSelectionModal } from "./SeatSelectionModal";
import { useNavigate } from "react-router-dom";

// Hàm tạo mảng ngày từ ngày hiện tại đến 7 ngày sau
const generateDates = (): DateType[] => {
  const dates: DateType[] = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayNames = [
      "Chủ nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];
    const dayName = dayNames[date.getDay()];

    dates.push({
      key: date.getDate().toString(),
      label: dayName,
      date: date.getDate().toString(),
    });
  }

  return dates;
};

const dates = generateDates();

export function MovieSchedule() {
  const [selectedDate, setSelectedDate] = useState<string>(dates[0].key);
  const [selectedCinema, setSelectedCinema] = useState<string>("");
  const [seatModalOpen, setSeatModalOpen] = useState(false);
  const [selectedShowtime, setSelectedShowtime] = useState<string>("");
  const navigate = useNavigate();

  const cinemas = scheduleData[selectedDate] || [];
  const selectedCinemaData = cinemas.find((c) => c.key === selectedCinema);

  // Khi đổi ngày, reset chọn rạp
  const handleSelectDate = (dateKey: string) => {
    setSelectedDate(dateKey);
    setSelectedCinema("");
  };

  // Khi chọn rạp
  const handleSelectCinema = (cinemaKey: string) => {
    setSelectedCinema(cinemaKey);
  };

  // Khi chọn suất chiếu
  const handleSelectShowtime = (showtime: string) => {
    setSelectedShowtime(showtime);
    setSeatModalOpen(true);
  };

  // Thông tin truyền vào modal
  const showtimeInfo =
    selectedCinemaData && selectedShowtime
      ? {
          movie: "Bộ 5 Siêu Đẳng Cấp",
          time: selectedShowtime,
          date:
            dates.find((d) => d.key === selectedDate)?.label +
            ", " +
            dates.find((d) => d.key === selectedDate)?.date,
          cinema: selectedCinemaData.name,
          room: "Cinema 1", // fake
          subtitle: selectedCinemaData.subtitle || "",
        }
      : null;

  return (
    <Card className="p-4 w-full max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-2">
        Lịch chiếu Bộ 5 Siêu Đẳng Cấp
      </h2>
      <DateTabs
        dates={dates}
        selectedDate={selectedDate}
        onSelect={handleSelectDate}
      />
      <CinemaList
        cinemas={cinemas}
        selectedCinema={selectedCinema}
        onSelect={handleSelectCinema}
      />
      {selectedCinemaData && (
        <ShowtimeList
          showtimes={selectedCinemaData.showtimes || []}
          subtitle={selectedCinemaData.subtitle}
          onSelectShowtime={handleSelectShowtime}
        />
      )}
      {showtimeInfo && (
        <SeatSelectionModal
          open={seatModalOpen}
          onClose={() => setSeatModalOpen(false)}
          showtimeInfo={showtimeInfo}
          onSubmit={(seats) => {
            setSeatModalOpen(false);
            // Tính tổng tiền (ghế VIP giá 120000, thường 75000)
            const total = seats.reduce((sum, seat) => {
              const vipRows = ["D", "E", "F"];
              const match = seat.match(/^([A-Z]+)(\d+)$/);
              if (
                match &&
                vipRows.includes(match[1]) &&
                +match[2] >= 6 &&
                +match[2] <= 13
              ) {
                return sum + 120000;
              }
              return sum + 75000;
            }, 0);
            navigate("/checkout", {
              state: {
                ticketInfo: {
                  ...showtimeInfo,
                  seats,
                  total,
                },
              },
            });
          }}
        />
      )}
    </Card>
  );
}

export default MovieSchedule;
