import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

const Navbar = () => {
  const { isAuthenticated, isOwner, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Appointment System
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-gray-900">
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

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
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

      {/* Mobile Menu (Collapsible) */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/"
              className="block text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="block text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/Testimonial"
              className="block text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Testimonial
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            {isAuthenticated && (
              <Link
                to="/appointments"
                className="block text-gray-700 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Appointments
              </Link>
            )}
            {isOwner && (
              <Link
                to="/dashboard"
                className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block text-gray-700 hover:text-gray-900 w-full text-left"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
