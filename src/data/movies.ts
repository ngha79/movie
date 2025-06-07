export interface MovieItemProps {
  id: number;
  image: string;
  backgroundImage: string;
  name: string;
  rating: number;
  title: string;
  genre: string;
  releaseDate: string;
  description: string;
  director: string;
  type: string;
}

export const movies: MovieItemProps[] = [
  {
    id: 24313,
    image: "https://image.tmdb.org/t/p/w500/5SiQsz5YCxZdCN5vhKdiQ2dQnr6.jpg",
    backgroundImage:
      "https://image.tmdb.org/t/p/w500/5SiQsz5YCxZdCN5vhKdiQ2dQnr6.jpg",
    name: "Mang Mẹ Đi Bỏ",
    rating: 8.5,
    title: "Mang Mẹ Đi Bỏ",
    genre: "Chính Kịch, Gia Đình",
    releaseDate: "2024-06-06",
    description: "A Collaboration between Vietnam and Korea Cinema. Plot TBA",
    director: "Đạo diễn A",
    type: "Phim chiếu rạp",
  },
  {
    id: 24326,
    image: "https://cinema.momocdn.net/img/77651738182522275-thing.png?size=M",
    backgroundImage:
      "https://cinema.momocdn.net/img/77651738182522275-thing.png?size=L",
    name: 'Từ "Thính" Thành Yêu',
    rating: 8.8,
    title: 'Từ "Thính" Thành Yêu',
    genre: "Chính Kịch",
    releaseDate: "2024-06-07",
    description:
      'Dính "Thính" Là Yêu là bộ phim hài lãng mạn xoay quanh cô nàng Taek-seon (Bae Doo-na) - bộ trưởng bộ thờ ơ, chủ tịch hội vô cảm, trưởng nhóm anti tình yêu. Đang sống cuộc đời như một "tảng băng di động", Taek-seon bất ngờ bị nhiễm "virus tình yêu" - cơn dịch bệnh kỳ lạ khiến con người không thể kiềm chế ham muốn yêu và được yêu.',
    director: "Đạo diễn B",
    type: "Phim chiếu rạp",
  },
  {
    id: 23621,
    image:
      "https://homepage.momocdn.net/cinema/momo-upload-api-230817100205-638278633257675877.jpeg",
    backgroundImage:
      "https://homepage.momocdn.net/cinema/momo-upload-api-230817100205-638278633257675877.jpeg",
    name: "Điệp Viên Stone",
    rating: 7.9,
    title: "Điệp Viên Stone",
    genre: "Gay cấn, Hành động",
    releaseDate: "2024-06-08",
    description:
      "Một nhân viên tình báo của cơ quan gìn giữ hòa bình toàn cầu bí ẩn phải gấp rút ngăn chặn một tin tặc đánh cắp vũ khí có giá trị và nguy hiểm nhất của họ.",
    director: "Đạo diễn C",
    type: "Phim chiếu rạp",
  },
  {
    id: 588,
    image:
      "https://homepage.momocdn.net/cinema/momo-cdn-api-220615131722-637908958421016583.jpg",
    backgroundImage:
      "https://homepage.momocdn.net/cinema/momo-cdn-api-220615131722-637908958421016583.jpg",
    name: "Ma Trận",
    rating: 9.2,
    title: "Ma Trận",
    genre: "Khoa Học Viễn Tưởng, Hành Động",
    releaseDate: "2024-06-09",
    description:
      "Biểu tượng của dòng phim hành động - viễn tưởng, Ma Trận là câu chuyện về Neo và hành trình của anh trong thế giới Ma Trận kỳ lạ. Neo tin rằng gã Morpheus (Laurence Fishburne) nham hiểm sẽ giúp anh tìm được câu trả lời cho câu hỏi: Ma Trận rốt cuộc là gì?",
    director: "Lana Wachowski",
    type: "Phim chiếu rạp",
  },
  {
    id: 25,
    image:
      "https://homepage.momocdn.net/cinema/momo-cdn-api-220615130903-637908953438970180.jpg",
    backgroundImage:
      "https://homepage.momocdn.net/cinema/momo-cdn-api-220615130903-637908953438970180.jpg",
    name: "Cô Gái Trong Lưới Nhện Ảo",
    rating: 8.1,
    title: "Cô Gái Trong Lưới Nhện Ảo",
    genre: "Gây Cấn, Hình Sự, Chính Kịch, Hành Động",
    releaseDate: "2024-06-10",
    description:
      "Được chuyển thể từ loạt tiểu thuyết trinh thám bán chạy nhất của Thuỵ Điển, The Girl in the Spider's Web là phần hậu truyện của The Girl with the Dragon Tattoo (2011).",
    director: "Fede Álvarez",
    type: "Phim chiếu rạp",
  },
];
