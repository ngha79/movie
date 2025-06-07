import React, { useState, useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Ticket,
  Coffee,
  Search,
  Package2,
  PanelLeft,
  ChevronLeft,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface StaffLayoutProps {
  children?: React.ReactNode;
}

const StaffLayout: React.FC<StaffLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const currentPageName = useMemo(() => {
    const currentItem = menuItems.find((item) =>
      location.pathname.startsWith(item.path)
    );
    return currentItem ? currentItem.name : "Dashboard Nhân viên";
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex flex-col ${
          isSidebarOpen ? "sm:ml-[220px]" : "sm:ml-[60px]"
        } transition-all duration-300 ease-in-out`}
      >
        <header className="sticky top-0 py-4 z-20 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/staff">Nhân viên</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{currentPageName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>NV</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Tài khoản nhân viên</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/staff/profile">Hồ sơ cá nhân</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Cài đặt</DropdownMenuItem>
              <DropdownMenuItem>Hỗ trợ</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:px-6 sm:py-0 transition-all duration-300 ease-in-out">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <div
      className={`fixed inset-y-0 left-0 z-10 flex flex-col border-r bg-background transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-56" : "w-16"
      }`}
      style={{ width: isSidebarOpen ? "220px" : "60px" }}
    >
      <div
        className={cn(
          "flex items-center border-b px-4 h-max lg:px-6 py-2",
          isSidebarOpen ? "w-56" : "flex flex-col gap-2"
        )}
      >
        <Link to="/staff" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span className={isSidebarOpen ? "" : "hidden"}>Nhân viên</span>
        </Link>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className={cn("h-8 w-8", isSidebarOpen ? "ml-auto" : "")}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                location.pathname.startsWith(item.path)
                  ? "bg-muted text-primary"
                  : ""
              }`}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              <span className={isSidebarOpen ? "" : "hidden"}>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

const menuItems = [
  {
    name: "Bán vé",
    path: "/staff/sell-tickets",
    icon: Ticket,
  },
  {
    name: "Bán đồ ăn/thức uống",
    path: "/staff/sell-food-drinks",
    icon: Coffee,
  },
  {
    name: "Tra cứu đặt chỗ",
    path: "/staff/lookup-booking",
    icon: Search,
  },
  {
    name: "Hồ sơ cá nhân",
    path: "/staff/profile",
    icon: User,
  },
];

export default StaffLayout;
