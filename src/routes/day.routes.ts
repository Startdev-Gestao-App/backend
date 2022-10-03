import { verifyToken } from "../middlewares/auth";
import {
  create,
  get,
  getId,
  update,
  remove,
} from "../controllers/day.controller";

const dayRoutes = (app: any) => {
  app.post("/v1/day", verifyToken, create);
  app.get("/v1/day", verifyToken, get);
  app.get("/v1/day/:id", verifyToken, getId);
  app.put("/v1/day/:id", verifyToken, update);
  app.delete("/v1/day/:id", verifyToken, remove);
};

export default dayRoutes;
