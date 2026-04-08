const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const bookRoutes = require("./routes/books");

app.use("/books", bookRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});