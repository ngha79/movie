export interface MovieCommentItemProps {
  id: number;
  image: string;
  name: string;
  review: string;
  title: string;
  rating?: number;
  total: string;
  comments: CommentItemProps[];
}

export interface UserCommentProps {
  id: number;
  fullname: string;
  avatar: string;
}

export interface CommentItemProps {
  id: number;
  user: UserCommentProps;
  createdAt: string;
  review: string;
  star: number;
  movieId: number;
}

//create data fake
export const listMovieComments: MovieCommentItemProps[] = [
  {
    id: 1,
    image: "https://image.tmdb.org/t/p/w500/5SiQsz5YCxZdCN5vhKdiQ2dQnr6.jpg",
    name: "Avengers: Endgame",
    review: "Biệt đội Avengers cùng nhau chiến đấu để cứu vũ trụ khỏi Thanos.",
    title: "Avengers: Endgame",
    rating: 9.2,
    total: "3",
    comments: [
      {
        id: 1,
        user: {
          id: 1,
          fullname: "Nguyễn Văn A",
          avatar: "https://i.pravatar.cc/150?img=1",
        },
        createdAt: "2024-03-15T10:00:00Z",
        review: "Bom tấn mãn nhãn, cảm xúc dâng trào!",
        star: 5,
        movieId: 1,
      },
      {
        id: 2,
        user: {
          id: 2,
          fullname: "Trần Thị B",
          avatar: "https://i.pravatar.cc/150?img=2",
        },
        createdAt: "2024-03-16T12:30:00Z",
        review: "Kết thúc tuyệt vời cho một hành trình dài.",
        star: 5,
        movieId: 1,
      },
      {
        id: 3,
        user: {
          id: 3,
          fullname: "Lê Văn C",
          avatar: "https://i.pravatar.cc/150?img=3",
        },
        createdAt: "2024-03-17T09:15:00Z",
        review:
          "Một số chi tiết hơi dài dòng nhưng vẫn là một tác phẩm xuất sắc.",
        star: 4,
        movieId: 1,
      },
    ],
  },
  {
    id: 2,
    image: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    name: "The Marvels",
    review:
      "Carol Danvers, Kamala Khan và Monica Rambeau cùng nhau chiến đấu chống lại một mối đe dọa mới.",
    title: "The Marvels",
    rating: 8.5,
    total: "2",
    comments: [
      {
        id: 4,
        user: {
          id: 4,
          fullname: "Phạm Thị D",
          avatar: "https://i.pravatar.cc/150?img=4",
        },
        createdAt: "2024-03-18T14:20:00Z",
        review: "Phim hành động gay cấn, hiệu ứng đẹp mắt!",
        star: 5,
        movieId: 2,
      },
      {
        id: 5,
        user: {
          id: 5,
          fullname: "Hoàng Văn E",
          avatar: "https://i.pravatar.cc/150?img=5",
        },
        createdAt: "2024-03-19T16:45:00Z",
        review: "Diễn xuất tốt, cốt truyện hấp dẫn.",
        star: 4,
        movieId: 2,
      },
    ],
  },
  {
    id: 3,
    image: "https://image.tmdb.org/t/p/w500/9PqD3wSIjntyJDBzMNuxuKHwpUD.jpg",
    name: "Aquaman and the Lost Kingdom",
    review:
      "Aquaman phải đối mặt với những thử thách mới khi Black Manta trở lại.",
    title: "Aquaman and the Lost Kingdom",
    rating: 7.8,
    total: "2",
    comments: [
      {
        id: 6,
        user: {
          id: 6,
          fullname: "Ngô Thị F",
          avatar: "https://i.pravatar.cc/150?img=6",
        },
        createdAt: "2024-03-20T11:00:00Z",
        review: "Hiệu ứng dưới nước tuyệt vời, cốt truyện hấp dẫn.",
        star: 4,
        movieId: 3,
      },
      {
        id: 7,
        user: {
          id: 7,
          fullname: "Đặng Văn G",
          avatar: "https://i.pravatar.cc/150?img=7",
        },
        createdAt: "2024-03-21T13:00:00Z",
        review: "Jason Momoa diễn xuất rất tốt trong vai Aquaman.",
        star: 5,
        movieId: 3,
      },
    ],
  },
  {
    id: 4,
    image: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    name: "Wonka",
    review:
      "Câu chuyện về tuổi thơ của Willy Wonka và hành trình trở thành nhà sản xuất sô cô la nổi tiếng.",
    title: "Wonka",
    rating: 8.0,
    total: "1",
    comments: [
      {
        id: 8,
        user: {
          id: 8,
          fullname: "Vũ Thị H",
          avatar: "https://i.pravatar.cc/150?img=8",
        },
        createdAt: "2024-03-22T15:30:00Z",
        review: "Phim gia đình vui nhộn, phù hợp cho mọi lứa tuổi.",
        star: 5,
        movieId: 4,
      },
    ],
  },
];
