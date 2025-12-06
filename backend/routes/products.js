const express = require("express");
const router = express.Router();
const { readDB } = require("../dbJson");

router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.products);
});

router.get("/:id", (req, res) => {
  const db = readDB();
  const product = db.products.find((p) => p.id == req.params.id);

  if (!product) return res.status(404).json({ error: "Product not found" });

  res.json(product);
});

module.exports = router;
