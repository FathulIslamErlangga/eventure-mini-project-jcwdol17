import cookieParser from "cookie-parser";
import express, { Application } from "express";
import { PORT } from "./config";
import authRouter from "./routes/auth.route";
import profileRouter from "./routes/profile.route";

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
  }

  routes() {
    this.app.use("/api", authRouter(), profileRouter());
  }

  errorHandle() {
    // middlewares
  }

  start() {
    this.app.listen(PORT, () => {
      console.log(`Eventure app listening at  http://localhost:${PORT}`);
    });
  }
}
