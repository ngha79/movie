export interface Showtime {
  time: string;
  url: string;
}

export interface MovieInCinema {
  id: number;
  name: string;
  image: string;
  genres: string[];
  showtimes: Showtime[];
}

export interface Cinema {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
}

export const mockCinemas: Cinema[] = [
  {
    id: 1,
    name: "CGV Aeon Mall",
    address:
      "Tầng 3, Aeon Mall, 30 Bờ Bao Tân Thắng, P. Sơn Kỳ, Q. Tân Phú, TP.HCM",
    phone: "028 1234 5678",
    email: "cgv.aeonmall@cgv.vn",
    description: "Rạp chiếu phim CGV tại Aeon Mall Tân Phú",
  },
  {
    id: 2,
    name: "CGV Crescent Mall",
    address:
      "Tầng 5, Crescent Mall, 101 Tôn Dật Tiên, P. Tân Phú, Q. 7, TP.HCM",
    phone: "028 1234 5679",
    email: "cgv.crescent@cgv.vn",
    description: "Rạp chiếu phim CGV tại Crescent Mall",
  },
  {
    id: 3,
    name: "Lotte Cinema Diamond",
    address: "Tầng 13, Diamond Plaza, 34 Lê Duẩn, P. Bến Nghé, Q. 1, TP.HCM",
    phone: "028 1234 5680",
    email: "lotte.diamond@lotte.vn",
    description: "Rạp chiếu phim Lotte Cinema tại Diamond Plaza",
  },
  {
    id: 4,
    name: "Lotte Cinema Landmark 81",
    address:
      "Tầng 4, Landmark 81, 720A Điện Biên Phủ, P. 22, Q. Bình Thạnh, TP.HCM",
    phone: "028 1234 5681",
    email: "lotte.landmark@lotte.vn",
    description: "Rạp chiếu phim Lotte Cinema tại Landmark 81",
  },
  {
    id: 5,
    name: "Galaxy Cinema Nguyễn Du",
    address: "116 Nguyễn Du, P. Bến Thành, Q. 1, TP.HCM",
    phone: "028 1234 5682",
    email: "galaxy.nguyendu@galaxy.vn",
    description: "Rạp chiếu phim Galaxy Cinema tại Nguyễn Du",
  },
  {
    id: 6,
    name: "Galaxy Cinema Quang Trung",
    address:
      "Tầng 3, Co.opmart Foodcosa, 304A Quang Trung, P. 10, Q. Gò Vấp, TP.HCM",
    phone: "028 1234 5683",
    email: "galaxy.quangtrung@galaxy.vn",
    description: "Rạp chiếu phim Galaxy Cinema tại Quang Trung",
  },
  {
    id: 7,
    name: "Beta Cinema Thao Dien",
    address:
      "Tầng 3, Thao Dien Pearl, 12 Quốc Hương, P. Thảo Điền, Q. 2, TP.HCM",
    phone: "028 1234 5684",
    email: "beta.thaodien@beta.vn",
    description: "Rạp chiếu phim Beta Cinema tại Thảo Điền",
  },
  {
    id: 8,
    name: "Beta Cinema Pham Hung",
    address:
      "Tầng 4, Crescent Mall, 101 Tôn Dật Tiên, P. Tân Phú, Q. 7, TP.HCM",
    phone: "028 1234 5685",
    email: "beta.phamhung@beta.vn",
    description: "Rạp chiếu phim Beta Cinema tại Phạm Hùng",
  },
];
