import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MovieItem from "../movie/MovieItem";
import { movies } from "@/data/movies";

const MovieShowing = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://homepage.momocdn.net/img/momo-upload-api-210701105436-637607336767432408.jpg')",
      }}
      className="bg-contain bg-center bg-no-repeat bg-black"
    >
      <div className="container mx-auto px-4 sm:px-8 py-8">
        <h1 className="text-2xl font-bold mb-4 text-white">Phim đang chiếu</h1>
        <Carousel className="w-full p-8">
          <CarouselContent>
            {movies
              .filter((movie) => movie.type === "Phim chiếu rạp")
              .map((movie, index) => (
                <CarouselItem
                  key={index}
                  className="lg:basis-1/5 md:basis-1/4 sm:basis-1/3 basis-full"
                >
                  <MovieItem
                    id={movie.id}
                    image={movie.image}
                    name={movie.name}
                    type={movie.type}
                    rating={movie.rating}
                    theme="dark"
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default MovieShowing;
