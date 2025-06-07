import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Plus,
  Minus,
  CreditCard,
  Ticket,
  Clock,
  MapPin,
  Users,
  SquareDot,
  SquareCheck,
  SquareX,
  Armchair,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Dữ liệu giả lập
const mockMovies = [
  {
    id: 1,
    name: "Avengers: Endgame",
    duration: "180 phút",
    rating: "PG-13",
    genre: "Hành động, Phiêu lưu",
  },
  {
    id: 2,
    name: "Spider-Man: No Way Home",
    duration: "148 phút",
    rating: "PG-13",
    genre: "Hành động, Phiêu lưu",
  },
  {
    id: 3,
    name: "The Batman",
    duration: "176 phút",
    rating: "PG-13",
    genre: "Hành động, Tội phạm",
  },
];

const mockShowtimes = [
  { id: 1, time: "10:00", room: "Phòng 1", availableSeats: 45 },
  { id: 2, time: "13:00", room: "Phòng 2", availableSeats: 38 },
  { id: 3, time: "16:00", room: "Phòng 1", availableSeats: 50 },
  { id: 4, time: "19:00", room: "Phòng 2", availableSeats: 42 },
];

// Dữ liệu ghế giả lập với hàng và số ghế
const generateMockSeats = (rows: number, seatsPerRow: number) => {
  const seats = [];
  for (let i = 0; i < rows; i++) {
    const rowChar = String.fromCharCode(65 + i); // A, B, C...
    for (let j = 1; j <= seatsPerRow; j++) {
      seats.push({
        id: `${rowChar}${j}`,
        row: rowChar,
        number: j,
        status: Math.random() > 0.8 ? "occupied" : "available", // Giả lập ghế đã đặt
      });
    }
  }
  return seats;
};

const mockSeats = generateMockSeats(8, 10); // 8 hàng, mỗi hàng 10 ghế

const SellTickets = () => {
  const [date, setDate] = useState<Date>();
  const [selectedMovie, setSelectedMovie] = useState<string>("");
  const [selectedShowtime, setSelectedShowtime] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [ticketCount, setTicketCount] = useState(1);

  const handleSeatClick = (seatId: string) => {
    const seat = mockSeats.find((s) => s.id === seatId);
    if (seat?.status === "occupied") return; // Không thể chọn ghế đã đặt

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      // Giới hạn số lượng ghế có thể chọn nếu cần, ví dụ theo ticketCount
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase" && ticketCount < 10) {
      setTicketCount(ticketCount + 1);
    } else if (action === "decrease" && ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };

  const calculateTotal = () => {
    const ticketPrice = 85000; // Giá vé cơ bản
    return selectedSeats.length * ticketPrice; // Tổng tiền dựa trên số lượng ghế đã chọn
  };

  const selectedMovieData = mockMovies.find(
    (movie) => movie.id.toString() === selectedMovie
  );
  const selectedShowtimeData = mockShowtimes.find(
    (showtime) => showtime.id.toString() === selectedShowtime
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Bán vé</h2>
          <p className="text-muted-foreground">
            Chọn phim, suất chiếu và ghế ngồi cho khách hàng
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          <Ticket className="mr-2 h-4 w-4" />
          Bán vé mới
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phần chọn phim và suất chiếu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Chọn phim và suất chiếu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Chọn ngày</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Chọn ngày"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Chọn phim</Label>
              <Select value={selectedMovie} onValueChange={setSelectedMovie}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn phim" />
                </SelectTrigger>
                <SelectContent>
                  {mockMovies.map((movie) => (
                    <SelectItem key={movie.id} value={movie.id.toString()}>
                      <div className="flex flex-col">
                        <span className="font-medium">{movie.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {movie.duration} • {movie.genre}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Chọn suất chiếu</Label>
              <Select
                value={selectedShowtime}
                onValueChange={setSelectedShowtime}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn suất chiếu" />
                </SelectTrigger>
                <SelectContent>
                  {mockShowtimes.map((showtime) => (
                    <SelectItem
                      key={showtime.id}
                      value={showtime.id.toString()}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{showtime.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{showtime.room}</span>
                          <Badge variant="secondary">
                            {showtime.availableSeats} ghế trống
                          </Badge>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedMovieData && selectedShowtimeData && (
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Thông tin suất chiếu:</span>
                      <Badge variant="outline">
                        {selectedMovieData.rating}
                      </Badge>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{selectedShowtimeData.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{selectedShowtimeData.room}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>
                          {selectedShowtimeData.availableSeats} ghế trống
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Phần chọn ghế */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Armchair className="h-5 w-5" />
              Chọn ghế
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!selectedMovieData || !selectedShowtimeData ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <Armchair className="h-12 w-12 mb-4" />
                <p>Vui lòng chọn phim và suất chiếu để xem sơ đồ ghế.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Màn hình */}
                <div className="bg-gray-800 text-white text-center py-2 rounded-md mb-4">
                  Màn hình
                </div>

                {/* Sơ đồ ghế */}
                <div className="flex flex-col items-center">
                  {/* Chú thích */}
                  <div className="flex justify-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <SquareDot className="h-4 w-4 text-gray-400" />
                      <span>Trống</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <SquareCheck className="h-4 w-4 text-green-500" />
                      <span>Đã chọn</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <SquareX className="h-4 w-4 text-red-500" />
                      <span>Đã đặt</span>
                    </div>
                  </div>
                  <div className="grid gap-2 overflow-auto max-w-full pb-4">
                    {/* Render ghế theo hàng */}
                    {Array.from(new Set(mockSeats.map((seat) => seat.row))).map(
                      (row) => (
                        <div key={row} className="flex items-center gap-2">
                          <span className="font-bold w-6 text-center text-muted-foreground">
                            {row}
                          </span>
                          <div className="flex gap-2">
                            {mockSeats
                              .filter((seat) => seat.row === row)
                              .map((seat) => (
                                <Button
                                  key={seat.id}
                                  variant="outline"
                                  size="icon"
                                  className={cn(
                                    "w-8 h-8",
                                    seat.status === "occupied"
                                      ? "bg-red-500 hover:bg-red-500 text-white cursor-not-allowed opacity-70"
                                      : selectedSeats.includes(seat.id)
                                      ? "bg-green-500 hover:bg-green-500 text-white"
                                      : "bg-gray-200 hover:bg-gray-300"
                                  )}
                                  onClick={() => handleSeatClick(seat.id)}
                                  disabled={seat.status === "occupied"}
                                >
                                  {seat.number}
                                </Button>
                              ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Số lượng vé</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange("decrease")}
                      disabled={selectedSeats.length === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={selectedSeats.length}
                      readOnly
                      className="w-16 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange("increase")}
                      disabled={selectedSeats.length >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Phần thanh toán */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Thanh toán
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedMovieData &&
            selectedShowtimeData &&
            selectedSeats.length > 0 ? (
              <>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Phim:</span>
                    <span className="font-medium">
                      {selectedMovieData.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Suất chiếu:</span>
                    <span className="font-medium">
                      {selectedShowtimeData.time} - {selectedShowtimeData.room}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ghế đã chọn:</span>
                    <span className="font-medium">
                      {selectedSeats.join(", ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Số lượng vé:</span>
                    <span className="font-medium">{selectedSeats.length}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Tổng tiền:</span>
                  <span>{calculateTotal().toLocaleString()}đ</span>
                </div>
                <Button className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Thanh toán ngay
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <CreditCard className="h-12 w-12 mb-4" />
                <p>Vui lòng chọn phim, suất chiếu và ghế ngồi để thanh toán.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellTickets;
