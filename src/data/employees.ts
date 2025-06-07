export interface Employee {
  id: number;
  fullname: string;
  email: string;
  position: string;
  hireDate: string;
}

export const employees: Employee[] = [
  {
    id: 101,
    fullname: "Nguyễn Văn Đạt",
    email: "dat.nguyen@example.com",
    position: "Quản lý Rạp",
    hireDate: "2022-03-01",
  },
  {
    id: 102,
    fullname: "Trần Thị Lan",
    email: "lan.tran@example.com",
    position: "Nhân viên Bán vé",
    hireDate: "2022-05-10",
  },
  {
    id: 103,
    fullname: "Lê Hoàng Dũng",
    email: "dung.le@example.com",
    position: "Nhân viên Sắp xếp suất chiếu",
    hireDate: "2023-01-20",
  },
  {
    id: 104,
    fullname: "Phạm Minh Anh",
    email: "anh.pham@example.com",
    position: "Quản lý Khách hàng",
    hireDate: "2023-06-15",
  },
];
