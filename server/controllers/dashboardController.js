const Service = require("../models/Service");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalServices = await Service.countDocuments();
    const activeServices = await Service.countDocuments({ isAvailable: true });

    res.json({
      totalServices,
      activeServices,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getServiceManagement = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
