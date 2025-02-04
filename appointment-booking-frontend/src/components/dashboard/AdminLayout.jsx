import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function AdminLayout({ children }) {
  const { isOwner } = useAuth();

  if (!isOwner) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex">
      <aside className="w-64 min-h-screen bg-gray-800 text-white">
        <nav className="p-4 space-y-2">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <a
            href="#stats"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
          >
            Statistics
          </a>
          <a
            href="#services"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
          >
            Services
          </a>
          <a
            href="#appointments"
            className="block py-2 px-4 hover:bg-gray-700 rounded"
          >
            Appointments
          </a>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100">{children}</main>
    </div>
  );
}
