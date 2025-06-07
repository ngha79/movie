import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { movies } from "@/data/movies";
import { Link } from "react-router";

const genres = [
  "Tất cả",
  "Chính Kịch",
  "Gia Đình",
  "Hành Động",
  "Hình Sự",
  "Hoạt Hình",
];
const countries = ["Tất cả", "Việt Nam", "Mỹ", "Hàn Quốc", "Nhật Bản"];
const years = ["Tất cả", "2025", "2024", "2023"];

export default function Movies() {
  const [genre, setGenre] = useState("Tất cả");
  const [country, setCountry] = useState("Tất cả");
  const [year, setYear] = useState("Tất cả");
  const [search, setSearch] = useState("");

  const filteredMovies = movies.filter((movie) => {
    const matchGenre = genre === "Tất cả" || movie.genre.includes(genre);
    const matchCountry = country === "Tất cả";
    const matchYear = year === "Tất cả" || movie.releaseDate.startsWith(year);
    const matchSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchGenre && matchCountry && matchYear && matchSearch;
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-pink-600">
        Tìm phim chiếu rạp
      </h1>
      <div className="flex flex-wrap gap-4 mb-8">
        <Select value={genre} onValueChange={setGenre}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Thể loại" />
          </SelectTrigger>
          <SelectContent>
            {genres.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Quốc gia" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Năm" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          className="w-64"
          placeholder="Tìm theo tên phim ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredMovies.map((movie) => (
          <Card
            key={movie.id}
            className="p-0 hover:shadow-xl transition-shadow"
          >
            <Link to={`/movie/${movie.id}`}>
              <div className="relative">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-72 object-cover rounded-t-lg  hover:cursor-pointer"
                />
                {/* Nút play trailer */}
                <button className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white/80 rounded-full p-2">
                    <svg
                      width="32"
                      height="32"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M12 10v12l10-6z" />
                    </svg>
                  </span>
                </button>
                {/* Nhãn độ tuổi nếu có */}
                <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
                  13+
                </span>
              </div>
              <CardContent className="py-3">
                <div className="font-medium hover:underline">{movie.title}</div>
                <div className="text-sm text-gray-500">{movie.genre}</div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
