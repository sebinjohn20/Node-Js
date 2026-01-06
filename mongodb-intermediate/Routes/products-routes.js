const express = require("express");
const router = express.Router();

const {
  insertSampleProducts,
  getProductStats,
  getProductCategory,
  getProductAnalysis,
} = require("../Controllers/product-controller");

router.post("/add", insertSampleProducts);
router.post("/stats", getProductStats);
router.post("/category", getProductCategory);
router.post("/analysis", getProductAnalysis);

module.exports = router;
