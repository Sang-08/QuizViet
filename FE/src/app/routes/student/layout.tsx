import { Outlet } from "react-router-dom";
import { TopNavbar } from "../../../components/layout/TopNavbar";
import { Footer } from "../../../components/layout/Footer";

export default function StudentLayout() {
  return (
    <div className="min-h-screen flex flex-col relative page-bg">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
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
