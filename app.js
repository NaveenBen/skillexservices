require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");
const router = require("./Routes/router");
const home = require("./Routes/testhome");
const PORT = 4002;



// middleware
app.use(express.json());
app.use(cors());
app.use(router);

// test seerver res
app.use("/home", home);
// test server res
app.get("/",(req, res) => {
    res.json("hello")
})


app.listen(PORT,()=>{
    console.log(`Server start at Port No :${PORT}`)
})
