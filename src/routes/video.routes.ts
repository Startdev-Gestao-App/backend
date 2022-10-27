import { verifyToken } from "../middlewares/auth";
import {
  upload,
  get,
  getId,
  update,
  remove,
  getVideoByCategory,
} from "../controllers/video.controller";

const videoRoutes = (app: any) => {
  app.post("/v1/video", verifyToken, upload);
  app.get("/v1/video", verifyToken, get);
  app.get("/v1/video/:id", verifyToken, getId);
  app.put("/v1/video/:id", verifyToken, update);
  app.delete("/v1/video/:id", verifyToken, remove);
  app.get("/v1/video/:id/category", verifyToken, getVideoByCategory);
};

export default videoRoutes;
