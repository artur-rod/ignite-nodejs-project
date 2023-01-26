import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

// CONTROLLERS
const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

// ROUTES
specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

specificationsRoutes.get("/", listSpecificationsController.handle);

export { specificationsRoutes };
