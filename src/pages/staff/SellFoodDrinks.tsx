import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Search,
  Coffee,
  Package2,
  ShoppingCart,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dữ liệu giả lập
const mockProducts = [
  {
    id: 1,
    name: "Bắp rang bơ",
    price: 45000,
    category: "Đồ ăn",
    image: "/popcorn.jpg",
    description: "Bắp rang bơ thơm ngon, giòn tan",
    stock: 50,
  },
  {
    id: 2,
    name: "Coca Cola",
    price: 25000,
    category: "Thức uống",
    image: "/coca.jpg",
    description: "Nước ngọt Coca Cola mát lạnh",
    stock: 100,
  },
  {
    id: 3,
    name: "Hot Dog",
    price: 55000,
    category: "Đồ ăn",
    image: "/hotdog.jpg",
    description: "Hot Dog thịt bò với sốt đặc biệt",
    stock: 30,
  },
  {
    id: 4,
    name: "Pepsi",
    price: 25000,
    category: "Thức uống",
    image: "/pepsi.jpg",
    description: "Nước ngọt Pepsi mát lạnh",
    stock: 100,
  },
  {
    id: 5,
    name: "Khoai tây chiên",
    price: 35000,
    category: "Đồ ăn",
    image: "/fries.jpg",
    description: "Khoai tây chiên giòn rụm",
    stock: 40,
  },
  {
    id: 6,
    name: "Nước cam",
    price: 30000,
    category: "Thức uống",
    image: "/orange.jpg",
    description: "Nước cam tươi mát lạnh",
    stock: 60,
  },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

const SellFoodDrinks = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: (typeof mockProducts)[0]) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCategoryIcon = (category: string, className: string) => {
    if (category === "Đồ ăn") {
      return <Package2 className={className} />;
    } else {
      return <Coffee className={className} />;
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Bán đồ ăn thức uống
          </h2>
          <p className="text-muted-foreground">
            Quản lý và bán các mặt hàng đồ ăn và thức uống
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Giỏ hàng ({cart.length} sản phẩm)
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Danh sách sản phẩm */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package2 className="h-5 w-5" />
              Danh sách sản phẩm
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tìm kiếm sản phẩm</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Nhập tên sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="Đồ ăn">Đồ ăn</SelectItem>
                    <SelectItem value="Thức uống">Thức uống</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="grid" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="grid">Lưới</TabsTrigger>
                <TabsTrigger value="list">Danh sách</TabsTrigger>
              </TabsList>
              <TabsContent value="grid" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="aspect-square w-full bg-muted relative">
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary">
                              {product.stock} còn lại
                            </Badge>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{product.name}</h3>
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              {getCategoryIcon(product.category, "h-3 w-3")}
                              {product.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold">
                              {product.price.toLocaleString()}đ
                            </span>
                            <Button
                              size="sm"
                              onClick={() => addToCart(product)}
                              disabled={product.stock === 0}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="list" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sản phẩm</TableHead>
                      <TableHead>Danh mục</TableHead>
                      <TableHead className="text-right">Giá</TableHead>
                      <TableHead className="text-right">Tồn kho</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {product.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1 w-fit"
                          >
                            {getCategoryIcon(product.category, "h-3 w-3")}
                            {product.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {product.price.toLocaleString()}đ
                        </TableCell>
                        <TableCell className="text-right">
                          {product.stock}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Giỏ hàng */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Giỏ hàng
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <ShoppingCart className="h-12 w-12 mb-4" />
                <p>Giỏ hàng trống</p>
                <p className="text-sm">Hãy thêm sản phẩm vào giỏ hàng</p>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sản phẩm</TableHead>
                      <TableHead className="text-right">Số lượng</TableHead>
                      <TableHead className="text-right">Đơn giá</TableHead>
                      <TableHead className="text-right">Thành tiền</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              {getCategoryIcon(item.category, "h-3 w-3")}
                              {item.category}
                            </Badge>
                            <span>{item.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {item.price.toLocaleString()}đ
                        </TableCell>
                        <TableCell className="text-right">
                          {(item.price * item.quantity).toLocaleString()}đ
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Tổng tiền:</span>
                    <span>{calculateTotal().toLocaleString()}đ</span>
                  </div>
                  <Button className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Thanh toán
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellFoodDrinks;
