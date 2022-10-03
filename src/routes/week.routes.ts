import { verifyToken } from "../middlewares/auth";
import {
  create,
  getAll,
  getId,
  update,
  remove,
} from "../controllers/week.controller";

const weekRoutes = (app: any) => {
  app.post("/v1/week", verifyToken, create);
  app.get("/v1/week", verifyToken, getAll);
  app.get("/v1/week/:id", verifyToken, getId);
  app.put("/v1/week/:id", verifyToken, update);
  app.delete("/v1/week/:id", verifyToken, remove);
};

export default weekRoutes;
