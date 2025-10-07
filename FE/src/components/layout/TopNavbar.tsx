import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  LogOut,
  User as UserIcon,
  FolderOpen,
  History,
  Heart,
  FileBarChart,
} from "lucide-react";
import { storage } from "../../libs/storage";
import { Button } from "../common/Button";
import { Logo } from "../common/Logo";

export const TopNavbar: React.FC = () => {
  const navigate = useNavigate();
  const user = storage.getUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleLogout = () => {
    storage.clearAuth();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-lg bg-white/70 border-b border-white/30">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
        {/* Brand */}
        <Logo size="md" to="/" />

        {/* Nav removed as requested */}

        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="ghost" size="sm" aria-label="Notifications">
            <Bell className="w-5 h-5" />
          </Button>
          <div className="relative" ref={ref}>
            <button
              type="button"
              className="flex items-center gap-3"
              onClick={() => setOpen((v) => !v)}
            >
              <div className="hidden sm:block leading-4 text-right">
                <p className="text-sm font-medium text-secondary-900">
                  {user?.name || "Người dùng"}
                </p>
                <p className="text-[12px] text-secondary-500">
                  {user?.email || "guest@example.com"}
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-primary-600" />
              </div>
            </button>
            {open && (
              <div className="absolute right-0 top-12 w-56 rounded-lg bg-white shadow-lg border border-secondary-200 p-2 z-50">
                <button
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-secondary-50 text-sm"
                  onClick={() => navigate("/profile")}
                >
                  <UserIcon className="w-4 h-4 mr-2 inline" /> Hồ sơ
                </button>
                <button
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-secondary-50 text-sm"
                  onClick={() => navigate("/favourites")}
                >
                  <Heart className="w-4 h-4 mr-2 inline" /> Yêu thích
                </button>
                {user?.role === "Student" && (
                  <>
                    <button
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-secondary-50 text-sm"
                      onClick={() => navigate("/student/classes")}
                    >
                      <UserIcon className="w-4 h-4 mr-2 inline" /> Lớp học
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-secondary-50 text-sm"
                      onClick={() => navigate("/student/history")}
                    >
                      <History className="w-4 h-4 mr-2 inline" /> Lịch sử
                    </button>
                  </>
                )}
                {user?.role === "Teacher" && (
                  <>
                    <button
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-secondary-50 text-sm"
                      onClick={() => navigate("/teacher/folders")}
                    >
                      <FolderOpen className="w-4 h-4 mr-2 inline" /> Thư mục
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-secondary-50 text-sm"
                      onClick={() => navigate("/teacher/classes")}
                    >
                      <UserIcon className="w-4 h-4 mr-2 inline" /> Lớp học
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-secondary-50 text-sm"
                      onClick={() => navigate("/teacher/history")}
                    >
                      <FileBarChart className="w-4 h-4 mr-2 inline" /> Báo cáo
                    </button>
                  </>
                )}
                <div className="my-1 h-px bg-secondary-200" />
                <button
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-secondary-50 text-sm text-error-600"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2 inline" /> Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
