import { authenticate, validate } from "../controllers/auth.controller";

const authRoutes = async (app: any) => {
  app.post("/v1/login", authenticate);
  app.post("/v1/validate", validate);
};

export default authRoutes;
