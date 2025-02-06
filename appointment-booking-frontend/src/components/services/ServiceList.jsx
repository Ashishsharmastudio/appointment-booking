import { useState, useEffect } from "react";
import api from "../../services/api";
import ServiceCard from "./ServiceCard";

// Spinner component
const Spinner = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Error message component
const ErrorMessage = ({ message }) => (
  <div className="text-center py-8 text-red-600">
    <p>{message}</p>
  </div>
);

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");
        // Ensure we're accessing the services array correctly
        setServices(response.data.services || []);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        setError("Failed to load services. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.isArray(services) && services.length > 0 ? (
        services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))
      ) : (
        <p className="text-center text-gray-600 col-span-full">
          No services available.
        </p>
      )}
    </div>
  );
};

export default ServiceList;
