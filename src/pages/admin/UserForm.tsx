import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockUsers, type User } from "@/data/users";

const UserForm = () => {
  const { userId } = useParams<{ userId?: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<Partial<User>>({
    fullname: "",
    email: "",
    phone: "",
    role: "user",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userId) {
      const existingUser = mockUsers.find((u) => u.id === userId);
      if (existingUser) {
        setUser(existingUser);
        setIsEditing(true);
      } else {
        // Handle case where user ID is not found (e.g., redirect to 404 or user list)
        navigate("/admin/users");
      }
    }
  }, [userId, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleSelectChange = (value: "user" | "admin") => {
    setUser((prevUser) => ({
      ...prevUser,
      role: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      console.log("Updating user:", user);
      // In a real application, you would send this data to an API
    } else {
      const newUser: User = {
        ...user,
        id: String(mockUsers.length + 1),
        createdAt: new Date().toISOString().split("T")[0],
      } as User; // Cast to User to satisfy type expectations after adding id and createdAt
      console.log("Adding new user:", newUser);
      // In a real application, you would send this data to an API
    }
    navigate("/admin/users");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right">
                Họ tên
              </Label>
              <Input
                id="fullname"
                className="col-span-3"
                value={user.fullname || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="col-span-3"
                value={user.email || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Số điện thoại
              </Label>
              <Input
                id="phone"
                className="col-span-3"
                value={user.phone || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Vai trò
              </Label>
              <Select value={user.role} onValueChange={handleSelectChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Người dùng</SelectItem>
                  <SelectItem value="admin">Quản trị viên</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/users")}
              >
                Hủy
              </Button>
              <Button type="submit">
                {isEditing ? "Lưu thay đổi" : "Thêm người dùng"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserForm;
