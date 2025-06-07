import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  User,
  KeyRound,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface EmployeeProfileData {
  id: number;
  fullname: string;
  email: string;
  position: string;
  hireDate: string;
  role: "admin" | "staff" | "manager";
  status: "active" | "inactive";
  // Thêm các trường khác nếu cần, ví dụ: phone, address, avatar
  phone?: string;
  address?: string;
  avatar?: string;
}

// Dữ liệu giả lập cho nhân viên hiện tại đang đăng nhập
const mockCurrentUserProfile: EmployeeProfileData = {
  id: 2,
  fullname: "Trần Thị B",
  email: "tranthib@example.com",
  position: "Nhân viên bán vé",
  hireDate: "2021-03-20",
  role: "staff",
  status: "active",
  phone: "0987654321",
  address: "123 Đường ABC, Quận XYZ, TP.HCM",
  avatar: "https://avatar.iran.liara.run/public/girl?username=tranthib",
};

const EmployeeProfile = () => {
  const [profile, setProfile] = useState<EmployeeProfileData>(
    mockCurrentUserProfile
  );
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Trong ứng dụng thực tế, bạn sẽ gửi yêu cầu cập nhật lên backend
    console.log("Lưu thông tin hồ sơ:", profile);
    setIsEditing(false);
    toast.success("Thông tin đã được cập nhật thành công!");
  };

  const handleCancel = () => {
    setProfile(mockCurrentUserProfile);
    setIsEditing(false);
    toast.info("Đã hủy các thay đổi");
  };

  const handlePasswordChange = () => {
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
    // Trong ứng dụng thực tế, bạn sẽ gửi yêu cầu thay đổi mật khẩu lên backend
    console.log("Thay đổi mật khẩu:", { currentPassword, newPassword });
    toast.success("Mật khẩu đã được thay đổi thành công!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const getRoleBadge = (role: "admin" | "staff" | "manager") => {
    const variants = {
      admin: "destructive" as const,
      manager: "default" as const,
      staff: "secondary" as const,
    };
    const labels = {
      admin: "Quản trị viên",
      manager: "Quản lý",
      staff: "Nhân viên",
    };
    return <Badge variant={variants[role]}>{labels[role]}</Badge>;
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Hồ sơ nhân viên</h2>
          <p className="text-muted-foreground">
            Quản lý thông tin cá nhân và tài khoản của bạn
          </p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "destructive" : "default"}
          className="transition-all duration-200"
        >
          {isEditing ? "Hủy chỉnh sửa" : "Chỉnh sửa hồ sơ"}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
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
                      {profile.fullname
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="secondary" size="sm">
                        Thay đổi ảnh
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="fullname"
                        className="flex items-center gap-2"
                      >
                        <User className="h-4 w-4" />
                        Họ và Tên
                      </Label>
                      <Input
                        id="fullname"
                        name="fullname"
                        value={profile.fullname}
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
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="position"
                        className="flex items-center gap-2"
                      >
                        <Briefcase className="h-4 w-4" />
                        Vị trí
                      </Label>
                      <Input
                        id="position"
                        name="position"
                        value={profile.position}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="hireDate"
                        className="flex items-center gap-2"
                      >
                        <Calendar className="h-4 w-4" />
                        Ngày thuê
                      </Label>
                      <Input
                        id="hireDate"
                        name="hireDate"
                        type="date"
                        value={profile.hireDate}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Vai trò:</span>
                    {getRoleBadge(profile.role)}
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={handleCancel}>
                    Hủy
                  </Button>
                  <Button onClick={handleSave}>Lưu thay đổi</Button>
                </div>
              )}
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
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Nhập mật khẩu hiện tại"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Mật khẩu mới</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>
              <Button
                onClick={handlePasswordChange}
                className="w-full sm:w-auto"
              >
                Thay đổi mật khẩu
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeProfile;
