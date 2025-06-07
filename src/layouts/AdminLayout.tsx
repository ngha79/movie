import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Film,
  Building2,
  Users,
  UserCog,
  BarChart3,
  Calendar,
  Ticket,
  Menu,
  LogOut,
  Bell,
  Settings,
  DollarSign,
  Coffee,
  Armchair,
  Package2,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  {
    title: "Tổng quan",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    title: "Quản lý phim",
    icon: Film,
    path: "/admin/movies",
  },
  {
    title: "Quản lý rạp",
    icon: Building2,
    path: "/admin/cinemas",
  },
  {
    title: "Quản lý người dùng",
    icon: Users,
    path: "/admin/users",
  },
  {
    title: "Quản lý nhân viên",
    icon: UserCog,
    path: "/admin/employees",
  },
  {
    title: "Quản lý lương",
    icon: DollarSign,
    path: "/admin/salaries",
  },
  {
    title: "Quản lý đồ ăn",
    icon: Coffee,
    path: "/admin/food-drinks",
  },
  {
    title: "Quản lý ghế ngồi",
    icon: Armchair,
    path: "/admin/seats",
  },
  {
    title: "Thống kê doanh thu",
    icon: BarChart3,
    path: "/admin/revenue-statistics",
  },
  {
    title: "Quản lý lịch chiếu",
    icon: Calendar,
    path: "/admin/showtimes",
  },
  {
    title: "Quản lý đặt vé",
    icon: Ticket,
    path: "/admin/bookings",
  },
];

interface AdminSidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isSidebarOpen,
  toggleSidebar,
}) => {
  const location = useLocation();

  return (
    <div
      className={cn(
        `fixed inset-y-0 left-0 z-10 flex flex-col border-r bg-background transition-all duration-300 ease-in-out`,
        isSidebarOpen ? "w-56" : "w-16"
      )}
      style={{ width: isSidebarOpen ? "220px" : "60px" }}
    >
      <div
        className={cn(
          "flex h-max items-center border-b",
          !isSidebarOpen ? "px-2" : " px-4 lg:px-6"
        )}
      >
        <Link
          to="/admin"
          className={cn(
            "flex items-center gap-2 font-semibold",
            isSidebarOpen ? "" : "hidden"
          )}
        >
          <Package2 className="h-6 w-6" />
          <span>Admin</span>
        </Link>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className={`ml-auto h-10 w-10 relative z-20 p-2 hover:bg-gray-100`}
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 transition-transform duration-300",
              isSidebarOpen ? "rotate-0" : "rotate-180"
            )}
          />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`,
                location.pathname.startsWith(item.path)
                  ? "bg-muted text-primary"
                  : ""
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className={isSidebarOpen ? "" : "hidden"}>
                {item.title}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={cn(
          `flex flex-col flex-1 ${
            isSidebarOpen ? "sm:ml-[220px]" : "sm:ml-[60px]"
          }
        transition-all duration-300 ease-in-out`
        )}
      >
        <header className="sticky top-0 py-4 z-20 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex items-center gap-4">
            {/* Mobile Sidebar Toggle */}
            <Button
              size="icon"
              variant="outline"
              onClick={toggleSidebar}
              className="sm:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
            <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
              Admin Dashboard
            </h1>
          </div>
          <div className="relative ml-auto flex-1 md:grow-0">
            {/* Search Input for Admin */}
            {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> */}
            {/* <Input
              type="search"
              placeholder="Tìm kiếm..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            /> */}
          </div>
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                3
              </Badge>
            </Button>
            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Tài khoản Admin</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Cài đặt</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:px-6 sm:py-0 transition-all duration-300 ease-in-out">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
