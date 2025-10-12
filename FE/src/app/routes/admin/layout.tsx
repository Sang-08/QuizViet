import { Outlet } from "react-router-dom";
import { TopNavbar } from "../../../components/layout/TopNavbar";
import { Footer } from "../../../components/layout/Footer";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col relative bg-white">
      <TopNavbar />
      <main className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
