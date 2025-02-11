import cookieParser from "cookie-parser";
import express, { Application } from "express";
import { PORT } from "./config";
import authRouter from "./routes/auth.route";
import profileRouter from "./routes/profile.route";
import { mailRoute } from "./routes/mail.route";
import { errorMiddleware, pagetNotFound } from "./middlewares/errorMiddleware";
import Cors from "./middlewares/cors.middleware";
import eventRoute from "./routes/events.route";
import reviewRoute from "./routes/reviews.route";
import categoryRoute from "./routes/category.route";

export class App {
  private app: Application;
  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.errorHandle();
  }

  configure() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(Cors);
  }

  routes() {
    this.app.use(
      "/api",
      authRouter(),
      profileRouter(),
      mailRoute(),
      eventRoute(),
      reviewRoute(),
      categoryRoute()
    );
  }

  errorHandle() {
    this.app.use(pagetNotFound);
    this.app.use(errorMiddleware);
  }

  start() {
    this.app.listen(PORT, () => {
      console.log(`Eventure app listening at  http://localhost:${PORT}`);
    });
  }
}
