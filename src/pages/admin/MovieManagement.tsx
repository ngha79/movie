import React, { useState, useEffect } from "react";
import { movies as initialMovies, type MovieItemProps } from "@/data/movies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

const MovieManagement = () => {
  const [movies, setMovies] = useState<MovieItemProps[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<MovieItemProps | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieItemProps | null>(
    null
  );

  useEffect(() => {
    // Load initial movies data
    setMovies(initialMovies);
  }, []);

  const handleAddClick = () => {
    setCurrentMovie(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (movie: MovieItemProps) => {
    setCurrentMovie(movie);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phim này không?")) {
      setMovies(movies.filter((movie) => movie.id !== id));
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newMovie: MovieItemProps = {
      id: currentMovie ? currentMovie.id : Date.now(), // Use current ID or generate new
      image: formData.get("image") as string,
      backgroundImage: formData.get("backgroundImage") as string,
      name: formData.get("name") as string,
      rating: parseFloat(formData.get("rating") as string),
      title: formData.get("title") as string,
      genre: formData.get("genre") as string,
      releaseDate: formData.get("releaseDate") as string,
      description: formData.get("description") as string,
      director: formData.get("director") as string,
      type: formData.get("type") as string,
    };

    if (currentMovie) {
      // Update existing movie
      setMovies(
        movies.map((movie) => (movie.id === currentMovie.id ? newMovie : movie))
      );
    } else {
      // Add new movie
      setMovies([...movies, newMovie]);
    }
    setIsFormOpen(false);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Quản lý phim</h2>
          <p className="text-muted-foreground">
            Quản lý thông tin phim và lịch chiếu
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Thêm phim mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Thêm phim mới</DialogTitle>
              <DialogDescription>
                Điền thông tin phim mới vào form bên dưới
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Tên phim
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  placeholder="Nhập tên phim"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Thời lượng
                </Label>
                <Input
                  id="duration"
                  className="col-span-3"
                  placeholder="Nhập thời lượng (phút)"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="language" className="text-right">
                  Ngôn ngữ
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Chọn ngôn ngữ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vi">Tiếng Việt</SelectItem>
                    <SelectItem value="en">Tiếng Anh</SelectItem>
                    <SelectItem value="ko">Tiếng Hàn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="format" className="text-right">
                  Định dạng
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Chọn định dạng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2d">2D</SelectItem>
                    <SelectItem value="3d">3D</SelectItem>
                    <SelectItem value="imax">IMAX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Mô tả
                </Label>
                <Textarea
                  id="description"
                  className="col-span-3"
                  placeholder="Nhập mô tả phim"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Hình ảnh
                </Label>
                <Input
                  id="image"
                  type="file"
                  className="col-span-3"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button>Lưu</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Danh sách phim</CardTitle>
              <CardDescription>
                Tổng số phim: {filteredMovies.length}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm phim..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hình ảnh</TableHead>
                <TableHead>Tên phim</TableHead>
                <TableHead>Thời lượng</TableHead>
                <TableHead>Ngôn ngữ</TableHead>
                <TableHead>Định dạng</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovies.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell>
                    <img
                      src={movie.image}
                      alt={movie.name}
                      className="h-12 w-8 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{movie.name}</TableCell>
                  <TableCell>{movie.duration} phút</TableCell>
                  <TableCell>{movie.language}</TableCell>
                  <TableCell>{movie.format}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedMovie(movie);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa phim</DialogTitle>
            <DialogDescription>
              Chỉnh sửa thông tin phim {selectedMovie?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedMovie && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Tên phim
                </Label>
                <Input
                  id="edit-name"
                  className="col-span-3"
                  defaultValue={selectedMovie.name}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-duration" className="text-right">
                  Thời lượng
                </Label>
                <Input
                  id="edit-duration"
                  className="col-span-3"
                  defaultValue={selectedMovie.duration}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-language" className="text-right">
                  Ngôn ngữ
                </Label>
                <Select defaultValue={selectedMovie.language}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Chọn ngôn ngữ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vi">Tiếng Việt</SelectItem>
                    <SelectItem value="en">Tiếng Anh</SelectItem>
                    <SelectItem value="ko">Tiếng Hàn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-format" className="text-right">
                  Định dạng
                </Label>
                <Select defaultValue={selectedMovie.format}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Chọn định dạng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2d">2D</SelectItem>
                    <SelectItem value="3d">3D</SelectItem>
                    <SelectItem value="imax">IMAX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Mô tả
                </Label>
                <Textarea
                  id="edit-description"
                  className="col-span-3"
                  defaultValue={selectedMovie.description}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-image" className="text-right">
                  Hình ảnh
                </Label>
                <Input
                  id="edit-image"
                  type="file"
                  className="col-span-3"
                  accept="image/*"
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button>Lưu thay đổi</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MovieManagement;
