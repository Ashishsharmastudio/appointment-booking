const Service = require("../models/Service");
const {
  formatSuccessResponse,
  formatErrorResponse,
} = require("../utils/helpers");

// Create new service
exports.createService = async (req, res) => {
  try {
    const { name, description, duration, price } = req.body;
    const service = new Service({
      name,
      description,
      duration,
      price,
    });

    const savedService = await service.save();
    res.status(201).json(formatSuccessResponse(savedService));
  } catch (error) {
    res.status(400).json(formatErrorResponse(error.message, 400));
  }
};

// Get all services with pagination
exports.getAllServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const services = await Service.find({ isAvailable: true })
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 });

    const total = await Service.countDocuments({ isAvailable: true });

    res.json({
      services,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalServices: total,
    });
  } catch (error) {
    res.status(500).json(formatErrorResponse(error.message, 500));
  }
};

// Get service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res
        .status(404)
        .json(formatErrorResponse("Service not found", 404));
    }
    res.json(formatSuccessResponse(service));
  } catch (error) {
    res.status(500).json(formatErrorResponse(error.message, 500));
  }
};

// Update service
exports.updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res
        .status(404)
        .json(formatErrorResponse("Service not found", 404));
    }

    res.json(formatSuccessResponse(updatedService));
  } catch (error) {
    res.status(400).json(formatErrorResponse(error.message, 400));
  }
};

// Delete service (soft delete)
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { isAvailable: false },
      { new: true }
    );

    if (!service) {
      return res
        .status(404)
        .json(formatErrorResponse("Service not found", 404));
    }

    res.json(
      formatSuccessResponse({ message: "Service deleted successfully" })
    );
  } catch (error) {
    res.status(500).json(formatErrorResponse(error.message, 500));
  }
};

// Search services
exports.searchServices = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const services = await Service.find({
      isAvailable: true,
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ],
    });

    res.json(formatSuccessResponse(services));
  } catch (error) {
    res.status(500).json(formatErrorResponse(error.message, 500));
  }
};

// Get services by category
exports.getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const services = await Service.find({
      isAvailable: true,
      category,
    });

    res.json(formatSuccessResponse(services));
  } catch (error) {
    res.status(500).json(formatErrorResponse(error.message, 500));
  }
};

// Bulk update service prices
exports.bulkUpdatePrices = async (req, res) => {
  try {
    const { updates } = req.body; // Array of {serviceId, newPrice}

    const updatePromises = updates.map((update) =>
      Service.findByIdAndUpdate(
        update.serviceId,
        { price: update.newPrice },
        { new: true }
      )
    );

    const updatedServices = await Promise.all(updatePromises);
    res.json(formatSuccessResponse(updatedServices));
  } catch (error) {
    res.status(400).json(formatErrorResponse(error.message, 400));
  }
};

// Get service availability
exports.getServiceAvailability = async (req, res) => {
  try {
    const { serviceId, date } = req.params;
    const service = await Service.findById(serviceId);

    if (!service) {
      return res
        .status(404)
        .json(formatErrorResponse("Service not found", 404));
    }

    // Add your business logic for checking availability
    const availability = {
      serviceId,
      date,
      availableSlots: [], // Add your availability calculation logic here
    };

    res.json(formatSuccessResponse(availability));
  } catch (error) {
    res.status(500).json(formatErrorResponse(error.message, 500));
  }
};
