import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MovieInfo from "./MovieInfo";
import MovieShowtimes from "./MovieShowtimes";
import type { MovieItemProps } from "@/data/movies";

interface MovieDetailTabsProps {
  movie: MovieItemProps;
}

export default function MovieDetailTabs({ movie }: MovieDetailTabsProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="showtimes" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="showtimes">Lịch chiếu</TabsTrigger>
          <TabsTrigger value="info">Thông tin</TabsTrigger>
        </TabsList>

        <TabsContent value="showtimes">
          <MovieShowtimes />
        </TabsContent>

        <TabsContent value="info">
          <MovieInfo movie={movie} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
