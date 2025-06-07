import { Link } from "react-router-dom";
import RouterHeader from "./RouterHeader";
import { Search, User, LogOut, Settings, History } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const isAuthenticated = true; // Giả lập trạng thái đăng nhập
  const userName = "Người dùng"; // Giả lập tên người dùng
  const userAvatar = "https://avatar.iran.liara.run/public/boy?username=user"; // Giả lập ảnh đại diện
  const userEmail = "user@example.com"; // Email cho dropdown

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center px-4 sm:px-8 justify-between z-10 sticky top-0">
      <div className="container mx-auto flex items-center justify-between h-full">
        <div className="flex items-center gap-4 sm:gap-12">
          <Link to={"/"} className="flex items-center gap-2 text-lg font-bold">
            {/* <img src="" alt="" className="w-8 h-8" /> */}
            <span>Movie</span>
          </Link>
          <RouterHeader />
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden lg:block w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm phim..."
              className="pl-8 pr-2 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full flex items-center justify-center p-0"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={userAvatar} alt="@user" />
                    <AvatarFallback>
                      {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userEmail}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    to="/account?tab=profile"
                    className="flex items-center w-full"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Hồ sơ cá nhân</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    to="/account?tab=security"
                    className="flex items-center w-full"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Cài đặt tài khoản</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    to="/account?tab=tickets"
                    className="flex items-center w-full"
                  >
                    <History className="mr-2 h-4 w-4" />
                    <span>Lịch sử đặt vé</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="space-x-2">
              <Link to="/login">
                <Button variant="ghost">Đăng nhập</Button>
              </Link>
              <Link to="/register">
                <Button>Đăng ký</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
