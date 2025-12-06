const express = require("express");
const router = express.Router();
const { readDB, writeDB } = require("../dbJson");

router.post("/", (req, res) => {
  const { product_id, name, email, phone, message } = req.body;

  // Collect missing fields for the frontend
  const missing = [];
  if (!product_id) missing.push("product_id");
  if (!name) missing.push("name");
  if (!email) missing.push("email");
  if (!message) missing.push("message");

  // If missing fields → send proper error response
  if (missing.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      fields: missing
    });
  }

  const db = readDB();

  const newEnquiry = {
    id: Date.now(),
    product_id: Number(product_id),
    name,
    email,
    phone,
    message,
    created_at: new Date().toISOString()
  };

  db.enquiries.push(newEnquiry);
  writeDB(db);

  res.json({
    message: "Enquiry saved",
    id: newEnquiry.id
  });
});


// Get enquiries for a product
router.get("/product/:productId", (req, res) => {
  const db = readDB();
  const list = db.enquiries.filter(e => e.product_id == req.params.productId);
  res.json(list);
});

// Admin list (optional)
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.enquiries.reverse());
});

module.exports = router;
