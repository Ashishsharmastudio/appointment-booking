import { useState, useEffect } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    duration: 30,
    price: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, servicesResponse] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/services"),
      ]);
      setStats(statsResponse.data);
      setServices(servicesResponse.data.services);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setLoading(false);
    }
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/services", newService);
      if (response.data.success) {
        setServices([...services, response.data.data]);
        setShowCreateForm(false);
        setNewService({ name: "", description: "", duration: 30, price: 0 });
      }
    } catch (error) {
      console.error("Failed to create service:", error);
    }
  };

  const handleUpdateService = async (serviceId) => {
    try {
      const response = await api.put(`/services/${serviceId}`, editingService);
      if (response.data.success) {
        setServices(
          services.map((service) =>
            service._id === serviceId ? response.data.data : service
          )
        );
        setEditingService(null);
      }
    } catch (error) {
      console.error("Failed to update service:", error);
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      const response = await api.delete(`/services/${serviceId}`);
      if (response.data.success) {
        setServices(services.filter((service) => service._id !== serviceId));
      }
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
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
          <p className="text-3xl font-bold">{services.length}</p>
        </div>
      </div>

      {/* Create Service Form */}
      <div className="mb-8">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {showCreateForm ? "Cancel" : "Create New Service"}
        </button>

        {showCreateForm && (
          <form
            onSubmit={handleCreateService}
            className="mt-4 bg-white p-6 rounded-lg shadow"
          >
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Service Name"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
                className="border p-2 rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                placeholder="Duration (minutes)"
                value={newService.duration}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    duration: parseInt(e.target.value),
                  })
                }
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={newService.price}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    price: parseFloat(e.target.value),
                  })
                }
                className="border p-2 rounded"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Create Service
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Service List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Service Management</h2>
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service._id} className="border p-4 rounded">
                {editingService && editingService._id === service._id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editingService.name}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          name: e.target.value,
                        })
                      }
                      className="border p-2 rounded w-full"
                    />
                    <textarea
                      value={editingService.description}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          description: e.target.value,
                        })
                      }
                      className="border p-2 rounded w-full"
                    />
                    <input
                      type="number"
                      value={editingService.price}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          price: parseFloat(e.target.value),
                        })
                      }
                      className="border p-2 rounded"
                    />
                    <div className="space-x-2">
                      <button
                        onClick={() => handleUpdateService(service._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingService(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-gray-600">{service.description}</p>
                      <p className="text-sm">
                        Duration: {service.duration}min | Price: $
                        {service.price}
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
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
