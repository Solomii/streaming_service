require("dotenv").config();
const PORT = process.env.PORT || 5000;
require("./config/db").connect();
const express = require('express');
const app = express();

const authRoute = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extented: true }));

app.use("/api/auth", authRoute);


app.get("*", (req, res) => {
  res.status(404).json({ message: "Wrong route!", error: true });
})

app.listen(PORT, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server started on :${PORT}`);
});

module.exports = {
	app
};