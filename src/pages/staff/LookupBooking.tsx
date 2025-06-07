import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Search,
  Printer,
  Download,
  RefreshCw,
  Bookmark,
  User,
  Phone,
  Mail,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface Booking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  movie: string;
  showtime: string;
  room: string;
  seats: string[];
  totalAmount: number;
  status: "confirmed" | "pending" | "cancelled";
  paymentMethod: string;
  bookingDate: string;
  qrCode: string;
}

// Dữ liệu giả lập
const mockBookings: Booking[] = [
  {
    id: "BK001",
    customerName: "Nguyễn Văn A",
    phone: "0123456789",
    email: "nguyenvana@example.com",
    movie: "Avengers: Endgame",
    showtime: "10:00 - 12/03/2024",
    room: "Phòng 1",
    seats: ["A1", "A2"],
    totalAmount: 170000,
    status: "confirmed",
    paymentMethod: "Thẻ tín dụng",
    bookingDate: "2024-03-10",
    qrCode: "/mock-qr-code-bk001.png", // Đường dẫn ảnh QR code giả lập
  },
  {
    id: "BK002",
    customerName: "Trần Thị B",
    phone: "0987654321",
    email: "tranthib@example.com",
    movie: "Spider-Man: No Way Home",
    showtime: "13:00 - 12/03/2024",
    room: "Phòng 2",
    seats: ["B3", "B4"],
    totalAmount: 170000,
    status: "pending",
    paymentMethod: "Tiền mặt",
    bookingDate: "2024-03-11",
    qrCode: "/mock-qr-code-bk002.png",
  },
  {
    id: "BK003",
    customerName: "Lê Văn C",
    phone: "0369852147",
    email: "levanc@example.com",
    movie: "The Batman",
    showtime: "16:00 - 12/03/2024",
    room: "Phòng 1",
    seats: ["C5", "C6"],
    totalAmount: 170000,
    status: "cancelled",
    paymentMethod: "Chuyển khoản",
    bookingDate: "2024-03-09",
    qrCode: "/mock-qr-code-bk003.png",
  },
  {
    id: "BK004",
    customerName: "Phạm Thị D",
    phone: "0777111222",
    email: "phamthid@example.com",
    movie: "Dune: Part Two",
    showtime: "19:00 - 13/03/2024",
    room: "Phòng 3",
    seats: ["D1", "D2", "D3"],
    totalAmount: 255000,
    status: "confirmed",
    paymentMethod: "Thẻ tín dụng",
    bookingDate: "2024-03-12",
    qrCode: "/mock-qr-code-bk004.png",
  },
  {
    id: "BK005",
    customerName: "Hoàng Văn E",
    phone: "0912345678",
    email: "hoangvane@example.com",
    movie: "Kung Fu Panda 4",
    showtime: "10:00 - 14/03/2024",
    room: "Phòng 4",
    seats: ["E1", "E2"],
    totalAmount: 170000,
    status: "pending",
    paymentMethod: "Tiền mặt",
    bookingDate: "2024-03-13",
    qrCode: "/mock-qr-code-bk005.png",
  },
];

const LookupBooking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<
    "id" | "customerName" | "phone" | "email"
  >("id");
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "confirmed" | "pending" | "cancelled"
  >("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch = searchTerm
      ? (booking[searchType] as string)
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      : true;

    const matchesStatus =
      selectedStatus === "all" || booking.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    let variant:
      | "default"
      | "secondary"
      | "outline"
      | "destructive"
      | null
      | undefined;
    let text = "";
    switch (status) {
      case "confirmed":
        variant = "default";
        text = "Đã xác nhận";
        break;
      case "pending":
        variant = "secondary";
        text = "Đang chờ";
        break;
      case "cancelled":
        variant = "destructive";
        text = "Đã hủy";
        break;
      default:
        variant = "outline";
        text = status;
    }
    return <Badge variant={variant}>{text}</Badge>;
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSearchType("id");
    setSelectedStatus("all");
  };

  const getSearchTypeIcon = (type: string) => {
    switch (type) {
      case "id":
        return <Bookmark className="mr-2 h-4 w-4" />;
      case "customerName":
        return <User className="mr-2 h-4 w-4" />;
      case "phone":
        return <Phone className="mr-2 h-4 w-4" />;
      case "email":
        return <Mail className="mr-2 h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tra cứu đặt chỗ</h2>
          <p className="text-muted-foreground">
            Tìm kiếm và xem thông tin chi tiết về các đặt chỗ của khách hàng.
          </p>
        </div>
        <Button onClick={handleResetFilters} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Đặt lại bộ lọc
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Tìm kiếm đặt chỗ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Tìm kiếm theo</Label>
              <Select
                value={searchType}
                onValueChange={(value) =>
                  setSearchType(
                    value as "id" | "customerName" | "phone" | "email"
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại tìm kiếm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">
                    {getSearchTypeIcon("id")}Mã đặt chỗ
                  </SelectItem>
                  <SelectItem value="customerName">
                    {getSearchTypeIcon("customerName")}Tên khách hàng
                  </SelectItem>
                  <SelectItem value="phone">
                    {getSearchTypeIcon("phone")}Số điện thoại
                  </SelectItem>
                  <SelectItem value="email">
                    {getSearchTypeIcon("email")}Email
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Từ khóa tìm kiếm</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Nhập từ khóa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Trạng thái</Label>
              <Select
                value={selectedStatus}
                onValueChange={(value) =>
                  setSelectedStatus(
                    value as "all" | "confirmed" | "pending" | "cancelled"
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                  <SelectItem value="pending">Đang chờ</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Table className="h-5 w-5" />
            Kết quả đặt chỗ
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mb-4" />
              <p>Không tìm thấy đặt chỗ nào phù hợp.</p>
              <p className="text-sm">Hãy thử điều chỉnh bộ lọc của bạn.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đặt chỗ</TableHead>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Phim</TableHead>
                    <TableHead>Suất chiếu</TableHead>
                    <TableHead>Ghế</TableHead>
                    <TableHead className="text-right">Tổng tiền</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">
                        {booking.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{booking.customerName}</div>
                          <div className="text-sm text-muted-foreground">
                            {booking.phone}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {booking.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{booking.movie}</TableCell>
                      <TableCell>
                        <div>
                          <div>{booking.showtime}</div>
                          <div className="text-sm text-muted-foreground">
                            {booking.room}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{booking.seats.join(", ")}</TableCell>
                      <TableCell className="text-right">
                        {booking.totalAmount.toLocaleString()}đ
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(booking)}
                        >
                          Chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal chi tiết đặt chỗ */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chi tiết đặt chỗ #{selectedBooking?.id}</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về đặt chỗ đã chọn.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="grid gap-4 py-4">
              <div className="flex flex-col">
                <Label className="text-muted-foreground">Khách hàng</Label>
                <span className="font-medium">
                  {selectedBooking.customerName}
                </span>
                <span className="text-sm text-muted-foreground">
                  {selectedBooking.phone} - {selectedBooking.email}
                </span>
              </div>
              <Separator />
              <div className="flex flex-col">
                <Label className="text-muted-foreground">
                  Phim & Suất chiếu
                </Label>
                <span className="font-medium">{selectedBooking.movie}</span>
                <span className="text-sm text-muted-foreground">
                  {selectedBooking.showtime} ({selectedBooking.room})
                </span>
              </div>
              <Separator />
              <div className="flex flex-col">
                <Label className="text-muted-foreground">Ghế đã chọn</Label>
                <span className="font-medium">
                  {selectedBooking.seats.join(", ")}
                </span>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Label className="text-muted-foreground">Tổng tiền</Label>
                  <span className="font-medium">
                    {selectedBooking.totalAmount.toLocaleString()}đ
                  </span>
                </div>
                <div className="flex flex-col">
                  <Label className="text-muted-foreground">
                    Phương thức TT
                  </Label>
                  <span className="font-medium">
                    {selectedBooking.paymentMethod}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Label className="text-muted-foreground">Trạng thái</Label>
                  {getStatusBadge(selectedBooking.status)}
                </div>
                <div className="flex flex-col">
                  <Label className="text-muted-foreground">Ngày đặt</Label>
                  <span className="font-medium">
                    {selectedBooking.bookingDate}
                  </span>
                </div>
              </div>
              <Separator />
              <div className="flex flex-col items-center justify-center p-2 border rounded-md">
                <Label className="text-muted-foreground mb-2">Mã QR vé</Label>
                <img
                  src={selectedBooking.qrCode}
                  alt="QR Code"
                  className="w-32 h-32 object-contain"
                />
                <span className="text-sm text-muted-foreground mt-2">
                  Quét mã để xác nhận
                </span>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => alert("In vé")}>
              <Printer className="mr-2 h-4 w-4" />
              In vé
            </Button>
            <Button onClick={() => alert("Tải xuống vé")}>
              <Download className="mr-2 h-4 w-4" />
              Tải xuống
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LookupBooking;
