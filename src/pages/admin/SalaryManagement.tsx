import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dữ liệu mẫu
const mockSalaries = [
  {
    id: 1,
    employeeName: "Nguyễn Văn A",
    position: "Nhân viên bán vé",
    baseSalary: 5000000,
    bonus: 500000,
    deductions: 200000,
    netSalary: 5300000,
    month: "06/2024",
    status: "Đã thanh toán",
  },
  {
    id: 2,
    employeeName: "Trần Thị B",
    position: "Nhân viên quầy đồ ăn",
    baseSalary: 4500000,
    bonus: 300000,
    deductions: 150000,
    netSalary: 4650000,
    month: "06/2024",
    status: "Chờ thanh toán",
  },
  // Thêm dữ liệu mẫu khác...
];

const SalaryManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("06/2024");

  const filteredSalaries = mockSalaries.filter(
    (salary) =>
      salary.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salary.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Quản lý lương</h2>
          <p className="text-muted-foreground">
            Quản lý thông tin lương và thanh toán cho nhân viên
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm bảng lương
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Danh sách lương</CardTitle>
              <CardDescription>
                Tổng số bảng lương: {filteredSalaries.length}
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn tháng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="06/2024">Tháng 6/2024</SelectItem>
                  <SelectItem value="05/2024">Tháng 5/2024</SelectItem>
                  <SelectItem value="04/2024">Tháng 4/2024</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm nhân viên..."
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
                <TableHead>Nhân viên</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead>Lương cơ bản</TableHead>
                <TableHead>Thưởng</TableHead>
                <TableHead>Khấu trừ</TableHead>
                <TableHead>Lương thực lĩnh</TableHead>
                <TableHead>Tháng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSalaries.map((salary) => (
                <TableRow key={salary.id}>
                  <TableCell className="font-medium">
                    {salary.employeeName}
                  </TableCell>
                  <TableCell>{salary.position}</TableCell>
                  <TableCell>{salary.baseSalary.toLocaleString()}đ</TableCell>
                  <TableCell>{salary.bonus.toLocaleString()}đ</TableCell>
                  <TableCell>{salary.deductions.toLocaleString()}đ</TableCell>
                  <TableCell>{salary.netSalary.toLocaleString()}đ</TableCell>
                  <TableCell>{salary.month}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        salary.status === "Đã thanh toán"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {salary.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalaryManagement;
