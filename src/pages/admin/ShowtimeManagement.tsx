import React, { useState, useEffect } from "react";
import { showtimes as initialShowtimes, type Showtime } from "@/data/showtimes";
import { movies, type MovieItemProps } from "@/data/movies"; // Import movies data
import { mockCinemas, type Cinema } from "@/data/cinemas"; // Import cinemas data
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const mockRooms = [
  { id: "room-1", name: "Phòng 1", cinemaId: 1 },
  { id: "room-2", name: "Phòng 2", cinemaId: 1 },
  { id: "room-3", name: "Phòng 3", cinemaId: 2 },
  { id: "room-4", name: "Phòng 4", cinemaId: 2 },
  { id: "room-5", name: "Phòng 5", cinemaId: 3 },
];

const ShowtimeManagement = () => {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentShowtime, setCurrentShowtime] = useState<Showtime | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCinema, setSelectedCinema] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>();

  useEffect(() => {
    setShowtimes(initialShowtimes);
  }, []);

  const getMovieTitle = (movieId: number): string => {
    const movie = movies.find((m: MovieItemProps) => m.id === movieId);
    return movie ? movie.title : "Không tìm thấy phim";
  };

  const getCinemaName = (cinemaId: number): string => {
    const cinema = mockCinemas.find((c: Cinema) => c.id === cinemaId);
    return cinema ? cinema.name : "Không tìm thấy rạp";
  };

  const getRoomName = (roomId: string): string => {
    const room = mockRooms.find((r) => r.id === roomId);
    return room ? room.name : "Không tìm thấy phòng";
  };

  const filteredShowtimes = showtimes.filter(
    (showtime) =>
      showtime.time.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getMovieTitle(showtime.movieId)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      getCinemaName(showtime.cinemaId)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (selectedCinema && showtime.cinemaId === Number(selectedCinema)) ||
      (selectedDate && showtime.date === format(selectedDate, "yyyy-MM-dd"))
  );

  const handleAddClick = () => {
    setCurrentShowtime(null);
    setIsFormOpen(false);
    setSelectedCinema("");
    setSelectedDate(undefined);
  };

  const handleEditClick = (showtime: Showtime) => {
    setCurrentShowtime(showtime);
    setIsFormOpen(true);
    setSelectedCinema(String(showtime.cinemaId));
    setSelectedDate(new Date(showtime.date));
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lịch chiếu này không?")) {
      setShowtimes(showtimes.filter((showtime) => showtime.id !== id));
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newShowtime: Showtime = {
      id: currentShowtime
        ? currentShowtime.id
        : showtimes.length > 0
        ? Math.max(...showtimes.map((s) => s.id)) + 1
        : 1,
      movieId: parseInt(formData.get("movieId") as string),
      cinemaId: parseInt(formData.get("cinemaId") as string),
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      room: formData.get("room") as string,
      availableSeats: parseInt(formData.get("availableSeats") as string),
    };

    if (currentShowtime) {
      setShowtimes(
        showtimes.map((showtime) =>
          showtime.id === currentShowtime.id ? newShowtime : showtime
        )
      );
    } else {
      setShowtimes([...showtimes, newShowtime]);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Quản lý Lịch chiếu
          </h2>
          <p className="text-muted-foreground">
            Quản lý thông tin các lịch chiếu phim
          </p>
        </div>
        <Button onClick={handleAddClick}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm Lịch chiếu Mới
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Danh sách Lịch chiếu</CardTitle>
              <CardDescription>
                Tổng số lịch chiếu: {filteredShowtimes.length}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedCinema} onValueChange={setSelectedCinema}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn rạp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả rạp</SelectItem>
                  {mockCinemas.map((cinema) => (
                    <SelectItem key={cinema.id} value={String(cinema.id)}>
                      {cinema.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Chọn ngày</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm lịch chiếu..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phim</TableHead>
                <TableHead>Rạp</TableHead>
                <TableHead>Phòng</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Ghế trống</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShowtimes.map((showtime) => {
                return (
                  <TableRow key={showtime.id}>
                    <TableCell className="font-medium">
                      {getMovieTitle(showtime.movieId)}
                    </TableCell>
                    <TableCell>{getCinemaName(showtime.cinemaId)}</TableCell>
                    <TableCell>{getRoomName(showtime.room)}</TableCell>
                    <TableCell>{showtime.time}</TableCell>
                    <TableCell>{showtime.date}</TableCell>
                    <TableCell>{showtime.availableSeats}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(showtime)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick(showtime.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Bạn có chắc chắn muốn xóa?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Thao tác này không thể hoàn tác. Thao tác này sẽ
                                xóa vĩnh viễn lịch chiếu này.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Hủy</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteClick(showtime.id)}
                              >
                                Xóa
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
            <h4 className="text-xl font-bold mb-4">
              {currentShowtime ? "Chỉnh sửa Lịch chiếu" : "Thêm Lịch chiếu Mới"}
            </h4>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <Label htmlFor="cinemaId">Rạp</Label>
                <Select
                  name="cinemaId"
                  value={
                    currentShowtime?.cinemaId
                      ? String(currentShowtime.cinemaId)
                      : selectedCinema
                  }
                  onValueChange={(value) => setSelectedCinema(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn rạp" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCinemas.map((cinema) => (
                      <SelectItem key={cinema.id} value={String(cinema.id)}>
                        {cinema.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date">Ngày</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "PPP")
                      ) : (
                        <span>Chọn ngày</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="hidden"
                  name="date"
                  value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
                />
              </div>
              <div>
                <Label htmlFor="room">Phòng</Label>
                <Select
                  name="room"
                  value={
                    currentShowtime?.room ||
                    mockRooms.find(
                      (room) => room.cinemaId === Number(selectedCinema)
                    )?.id ||
                    ""
                  }
                  onValueChange={(value) => {
                    setCurrentShowtime((prev) =>
                      prev ? { ...prev, room: value } : null
                    );
                  }}
                  disabled={!selectedCinema}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phòng" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockRooms
                      .filter(
                        (room) => room.cinemaId === Number(selectedCinema)
                      )
                      .map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="movieId">Phim</Label>
                <Select
                  name="movieId"
                  defaultValue={
                    currentShowtime?.movieId
                      ? String(currentShowtime.movieId)
                      : ""
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phim" />
                  </SelectTrigger>
                  <SelectContent>
                    {movies.map((movie: MovieItemProps) => (
                      <SelectItem key={movie.id} value={String(movie.id)}>
                        {movie.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="time">Thời gian</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  defaultValue={currentShowtime?.time || ""}
                  required
                />
              </div>
              <div>
                <Label htmlFor="availableSeats">Số ghế trống</Label>
                <Input
                  id="availableSeats"
                  name="availableSeats"
                  type="number"
                  defaultValue={currentShowtime?.availableSeats || 0}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormOpen(false)}
                >
                  Hủy
                </Button>
                <Button type="submit">
                  {currentShowtime ? "Lưu thay đổi" : "Thêm Lịch chiếu"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowtimeManagement;
