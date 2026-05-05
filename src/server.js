import "dotenv/config";
import express from "express";
import postRoutes from "./API/routes/postRoutes.js";
import connectDB from "./Infrastructure/database/connection.js";

const app = express();
app.use(express.json());
await connectDB();
app.use("/api/v1/posts", postRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
