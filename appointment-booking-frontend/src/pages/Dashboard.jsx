import { useState, useEffect } from "react";
import api from "../services/api";
import ServiceForm from "../components/services/ServiceForm";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [editingService, setEditingService] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const servicesPerPage = 5;

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    fetchServices();
  }, [currentPage]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, appointmentsResponse] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/appointments/all"),
      ]);

      setStats(statsResponse.data || {});
      setAppointments(appointmentsResponse.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/services?page=${currentPage}&limit=${servicesPerPage}`
      );

      if (response.data.success) {
        setServices(response.data.data);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSave = async () => {
    await fetchServices();
    setShowCreateForm(false);
    setEditingService(null);
  };

  const handleDeleteService = async (serviceId) => {
    try {
      const response = await api.delete(`/services/${serviceId}`);
      if (response.data.success) {
        setServices((prevServices) =>
          prevServices.filter((service) => service._id !== serviceId)
        );
      }
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Owner Dashboard</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Services</h3>
          <p className="text-3xl font-bold">{stats?.totalServices || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Appointments</h3>
          <p className="text-3xl font-bold">{appointments?.length || 0}</p>
        </div>
      </div>

      {/* Appointments Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Appointments</h2>
          <button
            onClick={() => setShowAppointments(!showAppointments)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {showAppointments ? "Hide Appointments" : "Show All Appointments"}
          </button>
        </div>

        {showAppointments && (
          <div className="bg-white rounded-lg shadow p-6">
            {appointments.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No appointments found
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="border p-4 rounded hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {new Date(appointment.date).toLocaleString()}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Client: {appointment?.user?.name || "Unknown"}
                        </p>
                        {appointment?.message && (
                          <p className="text-sm text-gray-600 mt-1">
                            Notes: {appointment.message}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {appointment?.service?.name || "Unknown Service"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Duration: {appointment?.service?.duration || 0} mins
                        </p>
                        <p className="text-lg font-bold text-green-600">
                          ${appointment?.service?.price || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create New Service */}
      <div className="mb-8">
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create New Service
        </button>
      </div>

      {/* Show Create or Edit Service Form */}
      {(showCreateForm || editingService) && (
        <ServiceForm
          service={editingService}
          onClose={() => {
            setShowCreateForm(false);
            setEditingService(null);
          }}
          onSave={handleServiceSave}
        />
      )}

      {/* Service List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Service Management</h2>
        <div className="space-y-4">
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service._id} className="border p-4 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-gray-600">{service.description}</p>
                    <p className="text-sm">
                      Duration: {service.duration} min | Price: ${service.price}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => setEditingService(service)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No services available</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Previous
          </button>
          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
