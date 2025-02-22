import { Link } from "react-router-dom";
import ServiceList from "../components/services/ServiceList";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="text-white py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1738408551920-b71c8b78c4ec?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D')",
        }}
      >
        <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Book Your Appointment Today
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8">
            Professional services at your convenience
          </p>
          <Link
            to="/services"
            className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-lg sm:text-xl transition hover:bg-gray-200"
          >
            View Services
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-8">
        <ServiceList />
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-100 py-16 px-4 sm:px-8">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                Easy Booking
              </h3>
              <p className="text-gray-600">
                Book appointments with just a few clicks.
              </p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                Professional Service
              </h3>
              <p className="text-gray-600">
                Experienced professionals at your service.
              </p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                Flexible Schedule
              </h3>
              <p className="text-gray-600">
                Choose from various available time slots.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
