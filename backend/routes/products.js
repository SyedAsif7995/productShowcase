const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  const { search = "", category = "", page = 1, limit = 6 } = req.query;
  const offset = (page - 1) * limit;

  let where = "WHERE 1=1";
  let params = [];

  if (search) {
    where += " AND name LIKE ?";
    params.push(`%${search}%`);
  }

  if (category) {
    where += " AND category = ?";
    params.push(category);
  }

  const countQuery = `SELECT COUNT(*) AS total FROM products ${where}`;

  db.query(countQuery, params, (err, countRows) => {
    if (err) return res.status(500).json({ error: err.message });

    const total = countRows[0].total;

    const dataQuery = `
      SELECT id, name, category, short_desc, price, image_url
      FROM products 
      ${where}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;

    db.query(dataQuery, [...params, Number(limit), offset], (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2.message });

      res.json({
        page: Number(page),
        pages: Math.ceil(total / limit),
        total,
        data: rows
      });
    });
  });
});

router.get("/:id", (req, res) => {
  db.query("SELECT * FROM products WHERE id = ?", [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows.length) return res.status(404).json({ error: "Product not found" });
    res.json(rows[0]);
  });
});

module.exports = router;
