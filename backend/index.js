import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./configuration/dataBase.js";
import cors from 'cors';

dotenv.config({ path: "./configuration/config.env" });

const app = express();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

connectDatabase();

import customerRouter from "./model.js";

// Use the router
app.use('/api', customerRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
