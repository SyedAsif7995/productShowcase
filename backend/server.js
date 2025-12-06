const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", require("./routes/products"));
app.use("/api/enquiries", require("./routes/enquiries"));

app.listen(4000, () => console.log("Backend running at http://localhost:4000"));
