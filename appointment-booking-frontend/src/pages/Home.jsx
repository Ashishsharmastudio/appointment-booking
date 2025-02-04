import { Link } from "react-router-dom";
import ServiceList from "../components/services/ServiceList";

export default function Home() {
  return (
    <div>
      <section
        className="text-white py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1738408551920-b71c8b78c4ec?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Book Your Appointment Today
          </h1>
          <p className="text-xl mb-8">
            Professional services at your convenience
          </p>
          <Link
            to="/services"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold"
          >
            View Services
          </Link>
        </div>
      </section>

      <section className="py-16">
        <ServiceList />
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Easy Booking</h3>
              <p>Book appointments with just a few clicks</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">
                Professional Service
              </h3>
              <p>Experienced professionals at your service</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Flexible Schedule</h3>
              <p>Choose from various available time slots</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
