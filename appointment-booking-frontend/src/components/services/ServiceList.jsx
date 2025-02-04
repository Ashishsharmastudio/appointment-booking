import { useState, useEffect } from "react";
import api from "../../services/api";
import ServiceCard from "./ServiceCard";

const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");
        // Ensure we're accessing the services array correctly
        setServices(response.data.services || []);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.isArray(services) &&
        services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
    </div>
  );
};

export default ServiceList;
