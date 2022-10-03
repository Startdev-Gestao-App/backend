import { verifyToken } from "../middlewares/auth";
import { getByDay, remove, upload } from "../controllers/attachment.controller";

const attachmentRoutes = (app: any) => {
  app.post("/v1/attachment", verifyToken, upload);
  app.get("/v1/attachment", verifyToken, getByDay);
  app.delete("/v1/attachment/:id", verifyToken, remove);
};

export default attachmentRoutes;
