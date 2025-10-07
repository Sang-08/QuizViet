import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-secondary-50">
      <Outlet />
    </div>
  );
}
