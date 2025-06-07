import React, { useState, useEffect } from "react";
import { bookings as initialBookings, type Booking } from "@/data/bookings";
import { mockUsers, type User } from "@/data/users"; // Import users data
import { showtimes, type Showtime } from "@/data/showtimes"; // Import showtimes data
import { movies, type MovieItemProps } from "@/data/movies"; // Import movies data for movie name
import { mockCinemas, type Cinema } from "@/data/cinemas"; // Import cinemas data for cinema name
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setBookings(initialBookings);
  }, []);

  const getUserFullname = (userId: number): string => {
    const user: User | undefined = mockUsers.find((u) => u.id === userId);
    return user ? user.fullname : "Không tìm thấy người dùng";
  };

  const getShowtimeDetails = (showtimeId: number) => {
    const showtime: Showtime | undefined = showtimes.find(
      (s) => s.id === showtimeId
    );
    if (!showtime) return "Không tìm thấy lịch chiếu";

    const movie: MovieItemProps | undefined = movies.find(
      (m) => m.id === showtime.movieId
    );
    const cinema: Cinema | undefined = mockCinemas.find(
      (c) => c.id === showtime.cinemaId
    );

    const movieName = movie ? movie.name : "Phim không xác định";
    const cinemaName = cinema ? cinema.name : "Rạp không xác định";

    return `${movieName} - ${cinemaName} (${showtime.date} ${showtime.time})`;
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      getUserFullname(booking.userId)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      getShowtimeDetails(booking.showtimeId)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const handleAddClick = () => {
    setCurrentBooking(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (booking: Booking) => {
    setCurrentBooking(booking);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đặt vé này không?")) {
      setBookings(bookings.filter((booking) => booking.id !== id));
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newBooking: Booking = {
      id: currentBooking ? currentBooking.id : Date.now(),
      userId: parseInt(formData.get("userId") as string),
      showtimeId: parseInt(formData.get("showtimeId") as string),
      bookingDate: formData.get("bookingDate") as string,
      seats: (formData.get("seats") as string).split(",").map((s) => s.trim()),
      totalAmount: parseFloat(formData.get("totalAmount") as string),
      status: formData.get("status") as "confirmed" | "pending" | "cancelled",
    };

    if (currentBooking) {
      setBookings(
        bookings.map((booking) =>
          booking.id === currentBooking.id ? newBooking : booking
        )
      );
    } else {
      setBookings([...bookings, newBooking]);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Quản lý Đặt vé</h2>
          <p className="text-muted-foreground">
            Quản lý thông tin đặt vé và trạng thái
          </p>
        </div>
        <Button onClick={handleAddClick}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm Đặt vé Mới
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Danh sách Đặt vé</CardTitle>
              <CardDescription>
                Tổng số đặt vé: {filteredBookings.length}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm đặt vé..."
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
                <TableHead>Người dùng</TableHead>
                <TableHead>Phim</TableHead>
                <TableHead>Rạp</TableHead>
                <TableHead>Lịch chiếu</TableHead>
                <TableHead>Ghế</TableHead>
                <TableHead>Tổng giá</TableHead>
                <TableHead>Ngày đặt</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => {
                return (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">
                      {getUserFullname(booking.userId)}
                    </TableCell>
                    <TableCell>
                      {getShowtimeDetails(booking.showtimeId)}
                    </TableCell>
                    <TableCell>{booking.seats.join(", ")}</TableCell>
                    <TableCell>
                      {booking.totalAmount.toLocaleString()}đ
                    </TableCell>
                    <TableCell>{booking.bookingDate}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(booking)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick(booking.id)}
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
                                xóa vĩnh viễn đặt vé này.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Hủy</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteClick(booking.id)}
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
              {currentBooking ? "Chỉnh sửa Đặt vé" : "Thêm Đặt vé Mới"}
            </h4>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <Label htmlFor="userId">Người dùng</Label>
                <Select
                  name="userId"
                  defaultValue={String(currentBooking?.userId || "")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn người dùng" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers.map((user) => (
                      <SelectItem key={user.id} value={String(user.id)}>
                        {user.fullname} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="showtimeId">Lịch chiếu</Label>
                <Select
                  name="showtimeId"
                  defaultValue={String(currentBooking?.showtimeId || "")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn lịch chiếu" />
                  </SelectTrigger>
                  <SelectContent>
                    {showtimes.map((showtime) => (
                      <SelectItem key={showtime.id} value={String(showtime.id)}>
                        {getShowtimeDetails(showtime.id)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bookingDate">Ngày đặt</Label>
                <Input
                  id="bookingDate"
                  name="bookingDate"
                  type="datetime-local"
                  defaultValue={
                    currentBooking?.bookingDate.substring(0, 16) || ""
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="seats">Ghế (cách nhau bởi dấu phẩy)</Label>
                <Input
                  id="seats"
                  name="seats"
                  defaultValue={currentBooking?.seats.join(", ") || ""}
                  required
                />
              </div>
              <div>
                <Label htmlFor="totalAmount">Tổng tiền</Label>
                <Input
                  id="totalAmount"
                  name="totalAmount"
                  type="number"
                  step="0.01"
                  defaultValue={currentBooking?.totalAmount || 0}
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  name="status"
                  defaultValue={currentBooking?.status || "pending"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormOpen(false)}
                >
                  Hủy
                </Button>
                <Button type="submit">
                  {currentBooking ? "Lưu thay đổi" : "Thêm Đặt vé"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
