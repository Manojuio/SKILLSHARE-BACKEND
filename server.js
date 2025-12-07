require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const sessionRoutes = require("./src/routes/session.routes");
const app = express();

app.use(express.json());
app.use(cors());

connectDB();
app.get("/", (req,res)=>{
    res.json({message:"Skill share backend is running"});
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sessions", sessionRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});