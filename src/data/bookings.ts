export interface Booking {
  id: number;
  userId: number;
  showtimeId: number;
  bookingDate: string;
  seats: string[];
  totalAmount: number;
  status: "confirmed" | "pending" | "cancelled";
}

export const bookings: Booking[] = [
  {
    id: 1001,
    userId: 2,
    showtimeId: 1,
    bookingDate: "2024-07-09T18:00:00Z",
    seats: ["A5", "A6"],
    totalAmount: 300000,
    status: "confirmed",
  },
  {
    id: 1002,
    userId: 4,
    showtimeId: 3,
    bookingDate: "2024-07-09T19:30:00Z",
    seats: ["B1", "B2", "B3"],
    totalAmount: 450000,
    status: "pending",
  },
  {
    id: 1003,
    userId: 5,
    showtimeId: 5,
    bookingDate: "2024-07-10T08:00:00Z",
    seats: ["C1"],
    totalAmount: 150000,
    status: "confirmed",
  },
];
