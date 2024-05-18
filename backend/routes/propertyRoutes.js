// backend/routes/propertyRoutes.js
const express = require("express");
const {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createProperty);
router.get("/", getProperties);
router.get("/:id", getProperty);
router.put("/:id", authMiddleware, updateProperty);
router.delete("/:id", authMiddleware, deleteProperty);

module.exports = router;

// backend/routes/propertyRoutes.js
const { contactSeller } = require("../controllers/propertyController");
router.post("/:id/contact", authMiddleware, contactSeller);
