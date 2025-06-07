import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Square } from "lucide-react";
import { mockCinemas } from "@/data/cinemas";

// Dữ liệu mẫu cho sơ đồ ghế
interface Seat {
  id: string;
  row: string;
  number: number;
  status: "available" | "booked" | "maintenance";
}

interface Room {
  id: string;
  name: string;
  cinemaId: number;
  seats: Seat[];
}

const mockRooms: Room[] = [
  {
    id: "room-1",
    name: "Phòng 1",
    cinemaId: 1,
    seats: Array.from({ length: 8 * 10 }, (_, i) => ({
      id: `A${(i % 10) + 1}`,
      row: String.fromCharCode(65 + Math.floor(i / 10)),
      number: (i % 10) + 1,
      status: i % 5 === 0 ? "booked" : "available",
    })),
  },
  {
    id: "room-2",
    name: "Phòng 2",
    cinemaId: 1,
    seats: Array.from({ length: 7 * 9 }, (_, i) => ({
      id: `B${(i % 9) + 1}`,
      row: String.fromCharCode(65 + Math.floor(i / 9)),
      number: (i % 9) + 1,
      status: i % 7 === 0 ? "maintenance" : "available",
    })),
  },
  {
    id: "room-3",
    name: "Phòng 3",
    cinemaId: 2,
    seats: Array.from({ length: 9 * 12 }, (_, i) => ({
      id: `C${(i % 12) + 1}`,
      row: String.fromCharCode(65 + Math.floor(i / 12)),
      number: (i % 12) + 1,
      status: "available",
    })),
  },
];

const SeatManagement = () => {
  const [selectedCinema, setSelectedCinema] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [currentSeats, setCurrentSeats] = useState<Seat[]>([]);

  useEffect(() => {
    if (selectedRoom) {
      const room = mockRooms.find((r) => r.id === selectedRoom);
      if (room) {
        setCurrentSeats(room.seats);
      } else {
        setCurrentSeats([]);
      }
    } else {
      setCurrentSeats([]);
    }
  }, [selectedRoom]);

  const handleSeatClick = (seatId: string) => {
    setCurrentSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === seatId
          ? {
              ...seat,
              status:
                seat.status === "available"
                  ? "booked"
                  : seat.status === "booked"
                  ? "maintenance"
                  : "available",
            }
          : seat
      )
    );
  };

  const seatsByRow = currentSeats.reduce((acc, seat) => {
    (acc[seat.row] = acc[seat.row] || []).push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  const sortedRows = Object.keys(seatsByRow).sort();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Quản lý Ghế ngồi
          </h2>
          <p className="text-muted-foreground">
            Quản lý sơ đồ và trạng thái ghế trong các phòng chiếu
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Sơ đồ ghế</CardTitle>
              <CardDescription>
                Chọn rạp và phòng để xem sơ đồ ghế
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedCinema} onValueChange={setSelectedCinema}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn rạp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Chọn rạp</SelectItem>
                  {mockCinemas.map((cinema) => (
                    <SelectItem key={cinema.id} value={String(cinema.id)}>
                      {cinema.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedRoom}
                onValueChange={setSelectedRoom}
                disabled={!selectedCinema}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn phòng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Chọn phòng</SelectItem>
                  {mockRooms
                    .filter((room) => room.cinemaId === Number(selectedCinema))
                    .map((room) => (
                      <SelectItem key={room.id} value={room.id}>
                        {room.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!selectedRoom ? (
            <div className="text-center text-muted-foreground py-10">
              Vui lòng chọn một rạp và phòng để xem sơ đồ ghế.
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 text-white p-2 rounded-t-lg w-3/4 text-center mb-4">
                Màn hình
              </div>
              <div className="space-y-2">
                {sortedRows.map((row) => (
                  <div key={row} className="flex items-center gap-2">
                    <div className="font-bold w-6 text-right">{row}</div>
                    <div className="flex gap-1">
                      {seatsByRow[row].map((seat) => (
                        <Button
                          key={seat.id}
                          variant="outline"
                          size="icon"
                          className={`h-8 w-8 text-xs font-medium ${
                            seat.status === "booked"
                              ? "bg-red-500 text-white hover:bg-red-600"
                              : seat.status === "maintenance"
                              ? "bg-gray-500 text-white hover:bg-gray-600"
                              : "bg-green-500 text-white hover:bg-green-600"
                          }`}
                          onClick={() => handleSeatClick(seat.id)}
                        >
                          {seat.number}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex gap-4">
                <div className="flex items-center gap-2">
                  <Square className="h-4 w-4 fill-green-500 text-green-500" />
                  <span>Có sẵn</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="h-4 w-4 fill-red-500 text-red-500" />
                  <span>Đã đặt</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="h-4 w-4 fill-gray-500 text-gray-500" />
                  <span>Bảo trì</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SeatManagement;
