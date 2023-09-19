require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const uploadRoutes = require("./routes/upload");
const downloadRoutes = require("./routes/download");
const filesRoutes = require("./routes/files");

const errorMiddleware = require("./middleware/errorMiddleware");

app.use(cors());

app.use(errorMiddleware);

app.use("/", uploadRoutes);
app.use("/", downloadRoutes);
app.use("/", filesRoutes);


app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
