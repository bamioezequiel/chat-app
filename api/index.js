import mongoose from "mongoose";
import app from "./src/app.js";

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("🟢 DB connection succesfull"))
  .catch((error) => console.log(error));

app.listen(process.env.PORT, () => {
  console.log(`🟢 Server listening at ${process.env.PORT}`);
});
