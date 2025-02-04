const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const auth = require("../middleware/auth");
const isOwner = require("../middleware/isOwner");

// Public routes
router.get("/", serviceController.getAllServices);
router.get("/:id", serviceController.getServiceById);

// Owner-only routes
router.post("/", auth, isOwner, serviceController.createService);
router.put("/:id", auth, isOwner, serviceController.updateService);
router.delete("/:id", auth, isOwner, serviceController.deleteService);

module.exports = router;
