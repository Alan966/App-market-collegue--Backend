import "dotenv/config";
import express from "express";
import db from "./utils/db";
const app = express();
app.use(express.json());
import { router } from "./routes/index";
const PORT = process.env.PORT || 3001;
db()
  .then(() => {
    console.log("Nos conectamos correctamente");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(router);
app.listen(PORT, () => {
  console.log("runing server " + PORT);
});
