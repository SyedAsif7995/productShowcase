const express = require("express");
const db = require("../db");
const router = express.Router();
require("dotenv").config();

router.post("/", (req, res) => {
  const { product_id, name, email, phone, message } = req.body;

  db.query(
    `INSERT INTO enquiries (product_id, name, email, phone, message)
     VALUES (?, ?, ?, ?, ?)`,
    [product_id, name, email, phone, message],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({ id: result.insertId });
    }
  );
});

router.get("/", (req, res) => {
  const token = req.headers["x-admin-token"];

  if (token !== process.env.ADMIN_TOKEN)
    return res.status(403).json({ error: "Unauthorized" });

  db.query(
    `SELECT e.*, p.name AS product_name
     FROM enquiries e
     LEFT JOIN products p ON p.id = e.product_id
     ORDER BY e.id DESC`,
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});
// Getting Enquiries
router.get("/product/:productId", (req, res) => {
  const productId = req.params.productId;

  db.query(
    `SELECT id, name, email, phone, message, created_at 
     FROM enquiries 
     WHERE product_id = ?
     ORDER BY created_at DESC`,
    [productId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});


module.exports = router;
