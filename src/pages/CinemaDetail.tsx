import { useParams } from "react-router-dom";
import { mockCinemas } from "@/data/cinemas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import MovieSchedule from "@/components/MovieSchedule/MovieSchedule";

const CinemaDetail = () => {
  const { cinemaId } = useParams<{ cinemaId?: string }>();
  const cinema = mockCinemas.find((c) => c.id === parseInt(cinemaId));
  if (!cinema) {
    return (
      <div className="container mx-auto p-4 text-center">
        Không tìm thấy thông tin rạp chiếu phim.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 font-sans">
      <Card className="mb-6 rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#333]">
            {cinema.name}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            <div className="flex items-center gap-2 mt-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{cinema.address}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{cinema.phone}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{cinema.email}</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed mb-4">
            {cinema.description}
          </p>
          {/* Thêm các phần khác như lịch chiếu, ưu đãi... */}
        </CardContent>
      </Card>

      {/* Placeholder cho lịch chiếu của rạp */}
      <Card className="mt-6 rounded-lg shadow-md">
        <CardHeader>
          <CardTitle>Lịch chiếu tại {cinema.name}</CardTitle>
          <CardDescription>Các bộ phim đang chiếu tại rạp này.</CardDescription>
        </CardHeader>
        <MovieSchedule />
      </Card>
    </div>
  );
};

export default CinemaDetail;
