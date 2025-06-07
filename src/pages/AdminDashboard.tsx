import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="movies"
                className="block py-2 px-3 rounded hover:bg-gray-700 transition-colors"
              >
                Quản lý Phim
              </Link>
            </li>
            <li>
              <Link
                to="cinemas"
                className="block py-2 px-3 rounded hover:bg-gray-700 transition-colors"
              >
                Quản lý Rạp
              </Link>
            </li>
            <li>
              <Link
                to="users"
                className="block py-2 px-3 rounded hover:bg-gray-700 transition-colors"
              >
                Quản lý Người dùng
              </Link>
            </li>
            <li>
              <Link
                to="employees"
                className="block py-2 px-3 rounded hover:bg-gray-700 transition-colors"
              >
                Quản lý Nhân viên
              </Link>
            </li>
            <li>
              <Link
                to="revenue-statistics"
                className="block py-2 px-3 rounded hover:bg-gray-700 transition-colors"
              >
                Thống kê Doanh thu
              </Link>
            </li>
            <li>
              <Link
                to="showtimes"
                className="block py-2 px-3 rounded hover:bg-gray-700 transition-colors"
              >
                Quản lý Lịch chiếu
              </Link>
            </li>
            <li>
              <Link
                to="bookings"
                className="block py-2 px-3 rounded hover:bg-gray-700 transition-colors"
              >
                Quản lý Đặt vé
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet /> {/* Renders the child route component */}
      </main>
    </div>
  );
}
