import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { movies } from "@/data/movies";

const cinemas = [
  { id: "cgv", name: "CGV", logo: "/logo-cgv.png" },
  { id: "lotte", name: "Lotte Cinema", logo: "/logo-lotte.png" },
  { id: "galaxy", name: "Galaxy Cinema", logo: "/logo-galaxy.png" },
  { id: "bhd", name: "BHD Star", logo: "/logo-bhd.png" },
  { id: "beta", name: "Beta Cinemas", logo: "/logo-beta.png" },
  // ... các hệ thống rạp khác
];

const locations = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng"];
const days = [
  { label: "Hôm nay", value: "2024-06-06" },
  { label: "Thứ 7", value: "2024-06-07" },
  { label: "Chủ nhật", value: "2024-06-08" },
  { label: "Thứ 2", value: "2024-06-09" },
  { label: "Thứ 3", value: "2024-06-10" },
  { label: "Thứ 4", value: "2024-06-11" },
  { label: "Thứ 5", value: "2024-06-12" },
];

const theaters = [
  { id: 1, name: "CGV Vincom Mega Mall Grand Park", logo: "/logo-cgv.png" },
  { id: 2, name: "CGV Hùng Vương Plaza", logo: "/logo-cgv.png" },
  { id: 3, name: "CGV Pearl Plaza", logo: "/logo-cgv.png" },
  { id: 4, name: "CGV Sư Vạn Hạnh", logo: "/logo-cgv.png" },
  { id: 5, name: "CGV Giga Mall Thủ Đức", logo: "/logo-cgv.png" },
  { id: 6, name: "CGV Hoàng Văn Thụ", logo: "/logo-cgv.png" },
  { id: 7, name: "CGV Aeon Bình Tân", logo: "/logo-cgv.png" },
];

export default function TodayShowtimes() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [selectedCinema, setSelectedCinema] = useState(cinemas[0].id);
  const [selectedTheater, setSelectedTheater] = useState(theaters[0].id);
  const [selectedDay, setSelectedDay] = useState(days[0].value);
  const [search, setSearch] = useState("");

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">
        Lịch chiếu phim
      </h1>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
        {/* Bộ lọc vị trí và hệ thống rạp */}
        <div className="flex flex-wrap gap-2 items-center">
          <span>Vị trí</span>
          <select
            className="border rounded px-3 py-1"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <Button variant="outline" className="ml-2">
            Gần bạn
          </Button>
          <div className="flex gap-2 ml-4">
            {cinemas.map((c) => (
              <button
                key={c.id}
                className={`rounded-full border px-3 py-1 ${
                  selectedCinema === c.id ? "border-pink-500 bg-pink-100" : ""
                }`}
                onClick={() => setSelectedCinema(c.id)}
              >
                <img src={c.logo} alt={c.name} className="w-8 h-8 inline" />
              </button>
            ))}
          </div>
        </div>
        {/* Layout 2 cột */}
        <div className="flex gap-6">
          {/* Cột trái: Danh sách rạp */}
          <div className="w-1/3">
            <Input
              placeholder="Tìm theo tên rạp ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-2"
            />
            <div className="bg-gray-50 rounded-lg overflow-y-auto max-h-96">
              {theaters.map((t) => (
                <div
                  key={t.id}
                  className={`flex items-center gap-2 px-3 py-2 cursor-pointer ${
                    selectedTheater === t.id ? "bg-pink-100" : ""
                  }`}
                  onClick={() => setSelectedTheater(t.id)}
                >
                  <img src={t.logo} alt={t.name} className="w-6 h-6" />
                  <span>{t.name}</span>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">
                Xem thêm
              </Button>
            </div>
          </div>
          {/* Cột phải: Lịch ngày + phim */}
          <div className="flex-1">
            <div className="flex gap-2 mb-4">
              {days.map((d) => (
                <Button
                  key={d.value}
                  variant={selectedDay === d.value ? "default" : "outline"}
                  onClick={() => setSelectedDay(d.value)}
                >
                  <div className="flex flex-col items-center">
                    <span className="font-bold">{d.label}</span>
                    <span className="text-xs">{d.value.slice(8, 10)}</span>
                  </div>
                </Button>
              ))}
            </div>
            <div className="space-y-6">
              {movies.map((m) => (
                <Card key={m.id} className="flex gap-4 p-4">
                  <img
                    src={m.image}
                    alt={m.title}
                    className="w-24 h-32 rounded-lg object-cover"
                  />
                  <CardContent className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                        {m.rating.toFixed(1)}
                      </span>
                      <span className="font-bold">{m.title}</span>
                    </div>
                    <div className="text-gray-500 text-sm mb-1">{m.genre}</div>
                    <div className="text-xs mb-2">{m.type}</div>
                    <div className="flex gap-2 flex-wrap">
                      <Button variant="outline" size="sm">
                        Trailer
                      </Button>
                      <Button variant="default" size="sm">
                        Xem chi tiết
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
