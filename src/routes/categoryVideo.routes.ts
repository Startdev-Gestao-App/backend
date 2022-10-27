import { verifyToken } from "../middlewares/auth";
import {
  create,
  get,
  getId,
  update,
  remove,
} from "../controllers/categoryVideo.controller";

const categoryVideoRoutes = (app: any) => {
  app.post("/v1/categoryVideo", verifyToken, create);
  app.get("/v1/categoryVideo", verifyToken, get);
  app.get("/v1/categoryVideo/:id", verifyToken, getId);
  app.put("/v1/categoryVideo/:id", verifyToken, update);
  app.delete("/v1/categoryVideo/:id", verifyToken, remove);
};

export default categoryVideoRoutes;
