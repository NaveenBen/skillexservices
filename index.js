// Import packages
const express = require("express");
const home = require("./Routes/home");

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/home", home);
// server res
app.get("/",(req, res) => {
    res.json("hello")
})

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));