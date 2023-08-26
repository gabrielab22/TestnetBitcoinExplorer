const express = require("express");
require("dotenv").config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

//Routes
const info = require("./routes/info");
app.use("/info", info);

const block = require("./routes/block");
app.use("/block", block);

const transacion = require("./routes/transaction");
app.use("/transaction", transacion);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
