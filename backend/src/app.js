import express from "express";
import router from "./routes/index.routes";

const app = express();

app.use("/api", router)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
