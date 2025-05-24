import express from "express";
import dotenv from "dotenv";
import { connection } from "./config/mongodb.js";
import expandedRoutes from "./routes/expandedRoute.js";
import masterRoutes from "./routes/masterRoute.js";
import systemRoutes from "./routes/systemRoute.js";
import tierRoutes from "./routes/tierRoute.js";
import listRoutes from "./routes/listRoute.js";
import warrantyRoute from "./routes/warrantyRoute.js";
dotenv.config();

const app = express();
app.use(express.json());
///
app.use("/api/expanded", expandedRoutes);
app.use("/api/master", masterRoutes);
app.use("/api/system", systemRoutes);
app.use("/api/tier", tierRoutes);
app.use("/api/list", listRoutes);
app.use("/api/Warranty", warrantyRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

connection();
