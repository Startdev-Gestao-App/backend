import { verifyToken } from "../middlewares/auth";
import { getDataDisk } from "../controllers/home.controller";

const homeRoutes = (app: any) => {
  app.get("/v1/infos", verifyToken, getDataDisk);
};

export default homeRoutes;
