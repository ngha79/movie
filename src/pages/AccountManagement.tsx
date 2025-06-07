import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Ticket,
  History,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address?: string;
  avatar?: string;
  membershipLevel: "bronze" | "silver" | "gold" | "platinum";
  points: number;
}

interface BookingHistory {
  id: string;
  movieName: string;
  cinemaName: string;
  showtime: string;
  seats: string[];
  totalAmount: number;
  status: "completed" | "cancelled" | "upcoming";
  bookingDate: string;
}

export default function AccountManagement() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(
    searchParams.get("tab") || "profile"
  );

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab") || "profile";
    if (selectedTab !== tabFromUrl) {
      setSelectedTab(tabFromUrl);
    }
    console.log("useEffect: URL tab changed to:", tabFromUrl);
  }, [searchParams, selectedTab]);

  console.log("Render: current selectedTab:", selectedTab);

  const [profile, setProfile] = useState<UserProfile>({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    address: "123 Đường ABC, Quận XYZ, TP.HCM",
    avatar: "https://avatar.iran.liara.run/public/boy?username=nguyenvana",
    membershipLevel: "silver",
    points: 750,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [bookingHistory] = useState<BookingHistory[]>([
    {
      id: "1",
      movieName: "Avengers: Endgame",
      cinemaName: "CGV Aeon Mall",
      showtime: "2024-03-20 19:30",
      seats: ["A1", "A2"],
      totalAmount: 180000,
      status: "completed",
      bookingDate: "2024-03-19",
    },
    {
      id: "2",
      movieName: "Spider-Man: No Way Home",
      cinemaName: "BHD Star Bitexco",
      showtime: "2024-03-25 20:00",
      seats: ["B3"],
      totalAmount: 90000,
      status: "upcoming",
      bookingDate: "2024-03-20",
    },
    {
      id: "3",
      movieName: "The Batman",
      cinemaName: "Galaxy Cinema",
      showtime: "2024-03-15 18:00",
      seats: ["C4", "C5"],
      totalAmount: 180000,
      status: "cancelled",
      bookingDate: "2024-03-14",
    },
  ]);

  const handleLogout = () => {
    // Xử lý đăng xuất
    toast.info("Đã đăng xuất");
    navigate("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    // Xử lý cập nhật thông tin
    console.log("Cập nhật thông tin hồ sơ:", profile);
    setIsEditing(false);
    toast.success("Thông tin đã được cập nhật thành công!");
  };

  const handleCancelEdit = () => {
    // Đặt lại profile về trạng thái ban đầu hoặc trạng thái cuối cùng được lưu
    setProfile({
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0123456789",
      address: "123 Đường ABC, Quận XYZ, TP.HCM",
      avatar: "https://avatar.iran.liara.run/public/boy?username=nguyenvana",
      membershipLevel: "silver",
      points: 750,
    });
    setIsEditing(false);
    toast.info("Đã hủy các thay đổi");
  };

  const handleChangePassword = () => {
    if (!currentPassword) {
      toast.error("Vui lòng nhập mật khẩu hiện tại");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    // Xử lý đổi mật khẩu
    console.log("Thay đổi mật khẩu:", { currentPassword, newPassword });
    toast.success("Mật khẩu đã được thay đổi thành công!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const getMembershipBadge = (
    level: "bronze" | "silver" | "gold" | "platinum"
  ) => {
    const variants: Record<
      typeof level,
      "secondary" | "default" | "destructive"
    > = {
      bronze: "secondary",
      silver: "default",
      gold: "secondary",
      platinum: "destructive",
    };
    const labels = {
      bronze: "Đồng",
      silver: "Bạc",
      gold: "Vàng",
      platinum: "Bạch kim",
    };
    return <Badge variant={variants[level]}>{labels[level]}</Badge>;
  };

  const getBookingStatusBadge = (
    status: "completed" | "cancelled" | "upcoming"
  ) => {
    const variants: Record<
      typeof status,
      "default" | "destructive" | "secondary"
    > = {
      completed: "default",
      cancelled: "destructive",
      upcoming: "secondary",
    };
    const labels = {
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
      upcoming: "Sắp tới",
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Quản lý tài khoản
          </h2>
          <p className="text-muted-foreground">
            Quản lý thông tin cá nhân, lịch sử đặt vé và bảo mật của bạn
          </p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
          className="transition-all duration-200"
        >
          {isEditing ? "Hủy chỉnh sửa" : "Chỉnh sửa hồ sơ"}
        </Button>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={(value) => {
          setSelectedTab(value);
          setSearchParams({ tab: value });
        }}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
          <TabsTrigger value="tickets">Vé đã đặt</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Thông tin cá nhân
              </CardTitle>
              <CardDescription>
                Thông tin cơ bản về tài khoản của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative group">
                  <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="text-2xl">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Button variant="secondary" size="sm">
                        Thay đổi ảnh
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Họ và Tên
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleChange}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="flex items-center gap-2"
                      >
                        <Phone className="h-4 w-4" />
                        Số điện thoại
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={profile.phone || ""}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="address"
                        className="flex items-center gap-2"
                      >
                        <MapPin className="h-4 w-4" />
                        Địa chỉ
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={profile.address || ""}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Ticket className="h-4 w-4" />
                        <span className="font-medium">Hạng thành viên:</span>
                      </div>
                      {getMembershipBadge(profile.membershipLevel)}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <History className="h-4 w-4" />
                        <span className="font-medium">Điểm tích lũy:</span>
                      </div>
                      <span className="text-lg font-semibold">
                        {profile.points} điểm
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={handleCancelEdit}>
                    Hủy
                  </Button>
                  <Button onClick={handleSaveProfile}>Lưu thay đổi</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                Lịch sử đặt vé
              </CardTitle>
              <CardDescription>
                Xem lại các vé đã đặt và trạng thái của chúng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Phim</TableHead>
                      <TableHead>Rạp</TableHead>
                      <TableHead>Suất chiếu</TableHead>
                      <TableHead>Ghế</TableHead>
                      <TableHead>Tổng tiền</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookingHistory.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">
                          {booking.movieName}
                        </TableCell>
                        <TableCell>{booking.cinemaName}</TableCell>
                        <TableCell>{booking.showtime}</TableCell>
                        <TableCell>{booking.seats.join(", ")}</TableCell>
                        <TableCell>
                          {booking.totalAmount.toLocaleString()}đ
                        </TableCell>
                        <TableCell>
                          {getBookingStatusBadge(booking.status)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" />
                Thay đổi mật khẩu
              </CardTitle>
              <CardDescription>
                Cập nhật mật khẩu của bạn để bảo vệ tài khoản
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Nhập mật khẩu hiện tại"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Mật khẩu mới</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              <Button
                onClick={handleChangePassword}
                className="w-full sm:w-auto"
              >
                Thay đổi mật khẩu
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center">
        <Button variant="destructive" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}
