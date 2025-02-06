import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


const Navbar = () => {
  const { isAuthenticated, isOwner, logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">Appointment System</span>
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link
                to="/services"
                className="text-gray-700 hover:text-gray-900"
              >
                Services
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-gray-900">
                About
              </Link>
              <Link
                to="/Testimonial"
                className="text-gray-700 hover:text-gray-900"
              >
                Testimonial
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-gray-900">
                Contact
              </Link>
              {isAuthenticated && (
                <Link
                  to="/appointments"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Appointments
                </Link>
              )}
              {isOwner && (
                <Link
                  to="/dashboard"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="text-gray-700 hover:text-gray-900"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
