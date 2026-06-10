import Header from "@/components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden bg-gray-200">
        <div className="shrink-0 p-2">
          <Header />
        </div>
        <main className="flex-1 overflow-hidden px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}