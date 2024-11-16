const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbconfig");
const dotenv = require("dotenv").config();
const app = express();

connectDb()

const PORT = process.env.PORT || 4000;

app.use(express.json())
app.use("/api/contacts",require("./routes/contactRoutes"))
app.use("/api/users",require("./routes/userRoutes"))
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`server is up at ${PORT}`)
});