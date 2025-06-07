import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MovieDetail from "./pages/MovieDetail";
import { Toaster } from "sonner";
import Checkout from "./pages/Checkout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AccountManagement from "./pages/AccountManagement";
import TodayShowtimes from "./pages/TodayShowtimes";
import Movies from "./pages/Movies";
import MovieReview from "./pages/MovieReview";
import CinemaDetail from "./pages/CinemaDetail";
import AdminLayout from "./layouts/AdminLayout";
import MovieManagement from "./pages/admin/MovieManagement";
import CinemaManagement from "./pages/admin/CinemaManagement";
import UserManagement from "./pages/admin/UserManagement";
import UserForm from "./pages/admin/UserForm";
import EmployeeManagement from "./pages/admin/EmployeeManagement";
import RevenueStatistics from "./pages/admin/RevenueStatistics";
import ShowtimeManagement from "./pages/admin/ShowtimeManagement";
import BookingManagement from "./pages/admin/BookingManagement";
import SalaryManagement from "./pages/admin/SalaryManagement";
import FoodDrinkManagement from "./pages/admin/FoodDrinkManagement";
import SeatManagement from "./pages/admin/SeatManagement";
import StaffLayout from "./layouts/StaffLayout";
import SellTickets from "./pages/staff/SellTickets";
import SellFoodDrinks from "./pages/staff/SellFoodDrinks";
import LookupBooking from "./pages/staff/LookupBooking";
import EmployeeProfile from "./pages/staff/EmployeeProfile";
import Reviews from "./components/reviews/Reviews";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "movies", element: <Movies /> },
        { path: "reviews", element: <Reviews /> },
        { path: "movie/:movieId", element: <MovieDetail /> },
        { path: "movie/:movieId/comments", element: <MovieReview /> },
        { path: "rap/:cinemaId", element: <CinemaDetail /> },
        { path: "showtimes/today", element: <TodayShowtimes /> },
        { path: "checkout", element: <Checkout /> },
        { path: "account", element: <AccountManagement /> },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <div>Chào mừng đến với bảng điều khiển Admin!</div>,
        },
        { path: "movies", element: <MovieManagement /> },
        { path: "cinemas", element: <CinemaManagement /> },
        { path: "users", element: <UserManagement /> },
        { path: "users/new", element: <UserForm /> },
        { path: "users/edit/:userId", element: <UserForm /> },
        { path: "employees", element: <EmployeeManagement /> },
        { path: "revenue-statistics", element: <RevenueStatistics /> },
        { path: "showtimes", element: <ShowtimeManagement /> },
        { path: "bookings", element: <BookingManagement /> },
        { path: "salaries", element: <SalaryManagement /> },
        { path: "food-drinks", element: <FoodDrinkManagement /> },
        { path: "seats", element: <SeatManagement /> },
      ],
    },
    {
      path: "/staff",
      element: <StaffLayout />,
      children: [
        {
          index: true,
          element: <div>Chào mừng đến với bảng điều khiển Nhân viên!</div>,
        },
        { path: "sell-tickets", element: <SellTickets /> },
        { path: "sell-food-drinks", element: <SellFoodDrinks /> },
        { path: "lookup-booking", element: <LookupBooking /> },
        { path: "profile", element: <EmployeeProfile /> },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
