export interface ShowTime {
  id: string;
  movieId: string;
  time: string;
  date: string;
  theater: string;
  availableSeats: number;
  price: number;
}

export interface MovieReview {
  id: string;
  movieId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface MovieItemProps {
  id: number;
  name: string;
  title: string;
  image: string;
  backgroundImage: string;
  rating: number;
  genre: string;
  releaseDate: string;
  description: string;
  director: string;
  type: string;
  duration: number;
  language: string;
  format: string;
}
