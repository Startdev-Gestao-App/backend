import { verifyToken } from "../middlewares/auth";
import {
  create,
  get,
  getId,
  update,
  remove,
  uploadAvatar,
} from "../controllers/user.controller";

const userRoutes = (app: any) => {
  app.post("/v1/user", create);
  app.get("/v1/user", verifyToken, get);
  app.get("/v1/user/:id", verifyToken, getId);
  app.put("/v1/user/:id", verifyToken, update);
  app.delete("/v1/user/:id", verifyToken, remove);
  app.patch("/v1/user/:id", verifyToken, uploadAvatar);
};

export default userRoutes;
