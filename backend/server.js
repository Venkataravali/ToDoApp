const express = require("express");

const mongoose = require("mongoose"); //for db connection
const routes = require("./routes/TodoRoute");
require("dotenv").config(); //to access env files

const cors = require("cors"); //for cross origin
const app = express(); //intiating app
const PORT = process.env.PORT | 5001; //listening to this port

app.use(express.json()); //to cabale to read json data
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb Connected...")) //if connected
  .catch((err) => console.error(err)); //caught

//Route

app.use("/api/todo", routes);

app.listen(PORT, () => console.log("Server running on port " + PORT));
