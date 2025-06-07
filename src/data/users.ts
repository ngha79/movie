export interface User {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  createdAt: string;
}

export const mockUsers: User[] = [
  {
    id: 1,
    fullname: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    role: "user",
    createdAt: "2024-03-15",
  },
  {
    id: 2,
    fullname: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0987654321",
    role: "admin",
    createdAt: "2024-03-14",
  },
  {
    id: 3,
    fullname: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0369852147",
    role: "user",
    createdAt: "2024-03-13",
  },
];
