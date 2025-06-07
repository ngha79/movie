import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MovieItem from "../movie/MovieItem";
import { movies } from "@/data/movies";

const MovieFuture = () => {
  return (
    <div
      style={{ backgroundImage: "../assets/images/show.jpg" }}
      className="bg-cover bg-center"
    >
      <div className="container mx-auto px-4 sm:px-8 py-8">
        <h1 className="text-2xl font-bold mb-4">Phim sắp chiếu</h1>
        <Carousel className="w-full p-8">
          <CarouselContent>
            {movies.map((movie, index) => (
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

export default MovieFuture;
