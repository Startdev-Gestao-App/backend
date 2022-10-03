import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import weekRoutes from "./week.routes";
import dayRoutes from "./day.routes";
import attachmentRoutes from "./attachment.routes";

const routes = (app: any) => {
  authRoutes(app);
  userRoutes(app);
  weekRoutes(app);
  dayRoutes(app);
  attachmentRoutes(app);
};

export default routes;
