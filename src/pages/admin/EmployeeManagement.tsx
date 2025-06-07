import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2, UserCog, Key } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Employee {
  id: number;
  fullname: string;
  email: string;
  position: string;
  hireDate: string;
  role: "admin" | "staff" | "manager";
  status: "active" | "inactive";
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    fullname: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    position: "Quản lý",
    hireDate: "2020-01-15",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    fullname: "Trần Thị B",
    email: "tranthib@example.com",
    position: "Nhân viên bán vé",
    hireDate: "2021-03-20",
    role: "staff",
    status: "active",
  },
  {
    id: 3,
    fullname: "Lê Văn C",
    email: "levanc@example.com",
    position: "Nhân viên pha chế",
    hireDate: "2022-06-01",
    role: "staff",
    status: "active",
  },
  {
    id: 4,
    fullname: "Phạm Thị D",
    email: "phamthid@example.com",
    position: "Kế toán",
    hireDate: "2019-11-10",
    role: "manager",
    status: "inactive",
  },
];

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    setEmployees(initialEmployees);
  }, []);

  const handleAddClick = () => {
    setCurrentEmployee(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (employee: Employee) => {
    setCurrentEmployee(employee);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này không?")) {
      setEmployees(employees.filter((employee) => employee.id !== id));
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newEmployee: Employee = {
      id: currentEmployee ? currentEmployee.id : Date.now(),
      fullname: formData.get("fullname") as string,
      email: formData.get("email") as string,
      position: formData.get("position") as string,
      hireDate: formData.get("hireDate") as string,
      role: formData.get("role") as "admin" | "staff" | "manager",
      status: formData.get("status") as "active" | "inactive",
    };

    if (currentEmployee) {
      setEmployees(
        employees.map((employee) =>
          employee.id === currentEmployee.id ? newEmployee : employee
        )
      );
    } else {
      setEmployees([...employees, newEmployee]);
    }
    setIsFormOpen(false);
  };

  const getStatusBadge = (status: "active" | "inactive") => {
    let variant:
      | "default"
      | "secondary"
      | "outline"
      | "destructive"
      | null
      | undefined;
    let text = "";
    switch (status) {
      case "active":
        variant = "default";
        text = "Hoạt động";
        break;
      case "inactive":
        variant = "secondary";
        text = "Không hoạt động";
        break;
      default:
        variant = "outline";
        text = status;
    }
    return <Badge variant={variant}>{text}</Badge>;
  };

  const handleResetPassword = (employee: Employee) => {
    // In a real application, you would send a request to your backend
    // to reset the employee's password and handle the response.
    alert(`Đặt lại mật khẩu cho ${employee.fullname} (ID: ${employee.id})`);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Quản lý Nhân viên
          </h2>
          <p className="text-muted-foreground">
            Quản lý thông tin và tài khoản của các nhân viên.
          </p>
        </div>
        <Button
          onClick={handleAddClick}
          className="bg-primary text-white hover:bg-primary/80"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm Nhân viên Mới
        </Button>
      </div>

      {isFormOpen && (
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {currentEmployee ? "Chỉnh sửa Nhân viên" : "Thêm Nhân viên Mới"}
              </DialogTitle>
              <DialogDescription>
                Nhập thông tin chi tiết của nhân viên.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="fullname">Họ và Tên</Label>
                <Input
                  id="fullname"
                  name="fullname"
                  defaultValue={currentEmployee?.fullname || ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={currentEmployee?.email || ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Vị trí</Label>
                <Input
                  id="position"
                  name="position"
                  defaultValue={currentEmployee?.position || ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hireDate">Ngày thuê</Label>
                <Input
                  id="hireDate"
                  name="hireDate"
                  type="date"
                  defaultValue={currentEmployee?.hireDate || ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Vai trò</Label>
                <Select
                  name="role"
                  defaultValue={currentEmployee?.role || "staff"}
                  onValueChange={(value) =>
                    // This is a placeholder, in a real app you'd update state
                    console.log("Role changed to:", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Quản trị viên</SelectItem>
                    <SelectItem value="manager">Quản lý</SelectItem>
                    <SelectItem value="staff">Nhân viên</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  name="status"
                  defaultValue={currentEmployee?.status || "active"}
                  onValueChange={(value) =>
                    // This is a placeholder, in a real app you'd update state
                    console.log("Status changed to:", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormOpen(false)}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="bg-primary text-white hover:bg-primary/80"
                >
                  Lưu
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCog className="h-5 w-5" />
            Danh sách nhân viên
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Họ và Tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Ngày thuê</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.id}</TableCell>
                    <TableCell>{employee.fullname}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.hireDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {employee.role === "admin"
                          ? "Quản trị viên"
                          : employee.role === "manager"
                          ? "Quản lý"
                          : "Nhân viên"}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(employee.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClick(employee)}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Sửa
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteClick(employee.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Xóa
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleResetPassword(employee)}
                        >
                          <Key className="h-4 w-4 mr-1" /> Đặt lại mật khẩu
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
