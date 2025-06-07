import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Film,
  Building2,
  Ticket,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const stats = [
  {
    title: "Tổng người dùng",
    value: "1,234",
    icon: Users,
    trend: "+12%",
    trendUp: true,
  },
  {
    title: "Phim đang chiếu",
    value: "24",
    icon: Film,
    trend: "+3",
    trendUp: true,
  },
  {
    title: "Rạp chiếu phim",
    value: "12",
    icon: Building2,
    trend: "0",
    trendUp: true,
  },
  {
    title: "Vé đã bán",
    value: "8,546",
    icon: Ticket,
    trend: "-5%",
    trendUp: false,
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Chào mừng bạn trở lại, Admin!
          </h2>
          <p className="text-muted-foreground">
            Đây là bảng điều khiển tổng quan về hệ thống của bạn.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs">
                {stat.trendUp ? (
                  <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span
                  className={stat.trendUp ? "text-green-500" : "text-red-500"}
                >
                  {stat.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Doanh thu theo tháng</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Thêm biểu đồ doanh thu ở đây */}
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Biểu đồ doanh thu
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Phim phổ biến</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Thêm danh sách phim phổ biến ở đây */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200" />
                    <div>
                      <p className="text-sm font-medium">Tên phim {i}</p>
                      <p className="text-xs text-muted-foreground">
                        {1000 + i * 100} vé
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {1000000 + i * 100000}đ
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
