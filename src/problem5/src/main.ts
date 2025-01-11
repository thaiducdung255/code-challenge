import express, {Request, Response} from "express";
import {getEnvOrThrow} from "@config/env";
import {createLogger} from "@utils/logger";
import {ApiResponse} from "@interfaces/api-response";
import {StatusCode} from "@constants/http-status-code";
import {userRouter} from "@routes/user";
import {apiLog} from "@middlewares/api-log";
import {errorHandler} from "@middlewares/error-handler";
import helmet from "helmet";
import {rateLimit} from "express-rate-limit";
import swaggerDoc from "express-jsdoc-swagger";
import {partialDbUrl} from "@db/conn";

const logger = createLogger("App");
const port = Number(getEnvOrThrow("PORT"));
const app = express();

app.use(helmet());

swaggerDoc(app)({
  info: {
    version: "1.0.0",
    title: "User service",
  },
  baseDir: __dirname,
  filesPattern: "./**/*.{ts,js}",
  swaggerUIPath: "/api-docs",
  exposeSwaggerUI: true,
});

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    legacyHeaders: false,
  }),
);

app.disable("x-powered-by");
app.use(express.json());
app.use(apiLog);
app.use(errorHandler);

app.get("/ping", (_req: Request, res: Response<ApiResponse>) => {
  res.json({code: StatusCode.SUCCESS});
});

app.use("/api/v1/users", userRouter);

app.listen(port, () => {
  logger.info(`Connecting to db: ${partialDbUrl}`)
  logger.info(`Server is listening on port ${port}`);
});
