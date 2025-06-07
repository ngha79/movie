import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { DollarSign, Ticket, Percent } from "lucide-react";

// Dữ liệu mẫu cho thống kê doanh thu
const mockRevenueData = [
  { date: "2024-05-01", totalRevenue: 10000000, ticketsSold: 100 },
  { date: "2024-05-02", totalRevenue: 12000000, ticketsSold: 120 },
  { date: "2024-05-03", totalRevenue: 9000000, ticketsSold: 90 },
  { date: "2024-05-04", totalRevenue: 15000000, ticketsSold: 150 },
  { date: "2024-05-05", totalRevenue: 11000000, ticketsSold: 110 },
  { date: "2024-05-06", totalRevenue: 13000000, ticketsSold: 130 },
  { date: "2024-05-07", totalRevenue: 16000000, ticketsSold: 160 },
  { date: "2024-05-08", totalRevenue: 14000000, ticketsSold: 140 },
  { date: "2024-05-09", totalRevenue: 17000000, ticketsSold: 170 },
  { date: "2024-05-10", totalRevenue: 18000000, ticketsSold: 180 },
  { date: "2024-05-11", totalRevenue: 19000000, ticketsSold: 190 },
  { date: "2024-05-12", totalRevenue: 20000000, ticketsSold: 200 },
  { date: "2024-05-13", totalRevenue: 17000000, ticketsSold: 170 },
  { date: "2024-05-14", totalRevenue: 16000000, ticketsSold: 160 },
  { date: "2024-05-15", totalRevenue: 18000000, ticketsSold: 180 },
];

const mockMovieRevenueData = [
  {
    movie: "Lật Mặt 7: Một Điều Ước",
    revenue: 500000000,
    tickets: 5000,
  },
  {
    movie: "Mai",
    revenue: 400000000,
    tickets: 4000,
  },
  {
    movie: "Đào, Phở Và Piano",
    revenue: 300000000,
    tickets: 3000,
  },
  {
    movie: "Exhuma: Quật Mộ Trùng Ma",
    revenue: 250000000,
    tickets: 2500,
  },
  {
    movie: "Quỷ Cẩu",
    revenue: 200000000,
    tickets: 2000,
  },
  {
    movie: "Gặp Lại Chị Bầu",
    revenue: 150000000,
    tickets: 1500,
  },
];

const mockCinemaRevenueData = [
  { cinema: "Rạp 1 - Nguyễn Du", revenue: 600000000 },
  { cinema: "Rạp 2 - Lotte Cinema", revenue: 450000000 },
  { cinema: "Rạp 3 - CGV Vincom", revenue: 300000000 },
  { cinema: "Rạp 4 - BHD Star", revenue: 200000000 },
];

const mockFoodDrinkRevenueData = [
  { item: "Bắp rang bơ", revenue: 120000000 },
  { item: "Coca Cola", revenue: 80000000 },
  { item: "Hot Dog", revenue: 60000000 },
  { item: "Combo 1", revenue: 150000000 },
  { item: "Nước suối", revenue: 30000000 },
];

const TicketTypeData = [
  { name: "Vé người lớn", value: 1200 },
  { name: "Vé trẻ em", value: 300 },
  { name: "Vé học sinh/sinh viên", value: 200 },
  { name: "Combo Bắp Nước", value: 800 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }> | undefined;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip p-2 bg-white border border-gray-300 rounded shadow-md">
        <p className="label font-bold">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>
            {`${p.name}: ${p.value.toLocaleString()}đ`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?:
    | Array<{ payload: { name: string; value: number; revenue?: number } }>
    | undefined;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip p-2 bg-white border border-gray-300 rounded shadow-md">
        <p className="label font-bold">{`${
          data.name
        }: ${data.value.toLocaleString()} vé`}</p>
        <p className="desc">{`(Doanh thu: ${
          data.revenue ? data.revenue.toLocaleString() + "đ" : "N/A"
        })`}</p>
      </div>
    );
  }
  return null;
};

const RevenueStatistics = () => {
  const [activeTab, setActiveTab] = useState("Tổng quan");

  const renderContent = () => {
    switch (activeTab) {
      case "Tổng quan":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tổng doanh thu
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.5 Tỷ đồng</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% so với tháng trước
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vé đã bán</CardTitle>
                <Ticket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15,000 vé</div>
                <p className="text-xs text-muted-foreground">
                  +15% so với tháng trước
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tỷ lệ lấp đầy rạp
                </CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">75%</div>
                <p className="text-xs text-muted-foreground">
                  Tăng 5% so với tháng trước
                </p>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-3">
              <CardHeader>
                <CardTitle>Doanh thu theo thời gian</CardTitle>
                <CardDescription>Biểu đồ doanh thu hàng ngày</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={mockRevenueData}>
                    <XAxis
                      dataKey="date"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        ` ${Math.floor(value / 1000000)} Tr`
                      }
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="totalRevenue"
                      stroke="#8884d8"
                      name="Doanh thu"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="ticketsSold"
                      stroke="#82ca9d"
                      name="Số vé bán ra"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-3">
              <CardHeader>
                <CardTitle>Thống kê loại vé đã bán</CardTitle>
                <CardDescription>Tỷ lệ các loại vé được bán ra</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={TicketTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {TicketTypeData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );
      case "Theo phim":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Doanh thu theo phim</CardTitle>
                <CardDescription>
                  Top phim có doanh thu cao nhất
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={mockMovieRevenueData.sort(
                      (a, b) => b.revenue - a.revenue
                    )}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis
                      dataKey="movie"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        `${Math.floor(value / 1000000)} Tr`
                      }
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" name="Doanh thu" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Số vé bán theo phim</CardTitle>
                <CardDescription>
                  Top phim có số vé bán ra nhiều nhất
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={mockMovieRevenueData.sort(
                      (a, b) => b.tickets - a.tickets
                    )}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis
                      dataKey="movie"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value} vé`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="tickets" fill="#82ca9d" name="Số vé" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );
      case "Theo rạp":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Doanh thu theo rạp</CardTitle>
                <CardDescription>
                  Doanh thu từ các rạp chiếu phim
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={mockCinemaRevenueData.sort(
                      (a, b) => b.revenue - a.revenue
                    )}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis
                      dataKey="cinema"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      angle={-30}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        `${Math.floor(value / 1000000)} Tr`
                      }
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#ffc658" name="Doanh thu" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );
      case "Theo đồ ăn/thức uống":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Doanh thu theo đồ ăn/thức uống</CardTitle>
                <CardDescription>
                  Doanh thu từ việc bán đồ ăn và thức uống
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={mockFoodDrinkRevenueData.sort(
                      (a, b) => b.revenue - a.revenue
                    )}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis
                      dataKey="item"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      angle={-30}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        `${Math.floor(value / 1000000)} Tr`
                      }
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#a4de6c" name="Doanh thu" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Thống kê doanh thu
          </h2>
          <p className="text-muted-foreground">
            Phân tích doanh thu và số liệu bán hàng
          </p>
        </div>
      </div>

      <Tabs defaultValue="Tổng quan" onValueChange={setActiveTab}>
        <TabsList className="grid w-fit grid-cols-4">
          <TabsTrigger value="Tổng quan">Tổng quan</TabsTrigger>
          <TabsTrigger value="Theo phim">Theo phim</TabsTrigger>
          <TabsTrigger value="Theo rạp">Theo rạp</TabsTrigger>
          <TabsTrigger value="Theo đồ ăn/thức uống">
            Theo đồ ăn/thức uống
          </TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-4">
          {renderContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RevenueStatistics;
