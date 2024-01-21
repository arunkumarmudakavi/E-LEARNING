import dotenv from "dotenv";
import connetDB from "./db/connection.js";
import { app } from "./app.js";

// if we config dotenv in main file then it availbale for every files.
dotenv.config({
  path: "./.env",
});

connetDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is listening at port: ${process.env.PORT}`);
    })
  })
  .catch((err) => {
    console.log("MONGO DB CONNECTION FAILED!!!", err);
  });
