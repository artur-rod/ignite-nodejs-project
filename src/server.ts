import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "./database";
import { AppError } from "./errors/AppError";
import { router } from "./routes";
import "./shared/container";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ error: error.message });
    }

    return response.status(500).json({ error: error.message || error.stack });
  }
);

app.listen(3333, () => console.log("Server a milhão 🔥"));
