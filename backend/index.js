import express, { response } from "express";
// import { PORT, mongoDBURL } from "./config.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

const port = process.env.PORT || 5555;

dotenv.config({
   path: "./.env",
});

//middleware for parsing request body
app.use(express.json());

//middleware for handling CORS policy
// -> Option 1: Allow all origins with Default of cors(*)
app.use(cors());

// -> Option 2: Allow custom origins
// app.use(
//    cors({
//       origin: "http://localhost:5173",
//       methods: ["GET", "POST", "PUT", "DELETE"],
//       allowedHeaders: ["Content-Type"],
//    })
// );

app.get("/", (req, res) => {
   console.log(req);
   return res.status(234).send("Welcome to the Bookstore...");
});

//middleware for using our express routing
app.use("/books", booksRoute);

mongoose
   .connect(process.env.MONGODB_URL)
   .then(() => {
      console.log("✔️ Successfully connected to MongoDB");

      app.listen(port, () => {
         console.log(`⚙️ Server running on PORT: ${port}`);
      });
   })
   .catch((error) => {
      console.log(error);
   });
