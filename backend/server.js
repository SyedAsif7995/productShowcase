require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const productsRouter = require("./routes/products");
const enquiriesRouter = require("./routes/enquiries");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/products", productsRouter);
app.use("/api/enquiries", enquiriesRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
