import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/public", express.static(__dirname + "/public"));

// app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

routes(app);

export default app;
