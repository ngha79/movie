export interface Showtime {
  id: number;
  movieId: number;
  cinemaId: number;
  date: string;
  time: string;
  room: string;
  availableSeats: number;
}

export const theaters = [
  { id: 1, name: "CGV Vincom Mega Mall Grand Park", logo: "/logo-cgv.png" },
  { id: 2, name: "CGV Hùng Vương Plaza", logo: "/logo-cgv.png" },
  { id: 3, name: "CGV Pearl Plaza", logo: "/logo-cgv.png" },
  { id: 4, name: "CGV Sư Vạn Hạnh", logo: "/logo-cgv.png" },
  { id: 5, name: "CGV Giga Mall Thủ Đức", logo: "/logo-cgv.png" },
  { id: 6, name: "CGV Hoàng Văn Thụ", logo: "/logo-cgv.png" },
  { id: 7, name: "CGV Aeon Bình Tân", logo: "/logo-cgv.png" },
];

export const showtimes: Showtime[] = [
  {
    id: 1,
    movieId: 1,
    cinemaId: 1,
    date: "2024-07-10",
    time: "09:00",
    room: "Phòng 1",
    availableSeats: 100,
  },
  {
    id: 2,
    movieId: 1,
    cinemaId: 1,
    date: "2024-07-10",
    time: "12:00",
    room: "Phòng 1",
    availableSeats: 80,
  },
  {
    id: 3,
    movieId: 2,
    cinemaId: 1,
    date: "2024-07-10",
    time: "10:30",
    room: "Phòng 2",
    availableSeats: 120,
  },
  {
    id: 4,
    movieId: 3,
    cinemaId: 2,
    date: "2024-07-10",
    time: "09:30",
    room: "Phòng 3",
    availableSeats: 90,
  },
  {
    id: 5,
    movieId: 4,
    cinemaId: 2,
    date: "2024-07-10",
    time: "10:00",
    room: "Phòng 4",
    availableSeats: 150,
  },
];
