import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../modules/cars/useCases/listSpecificatons/ListSpecificationController";

const specificationsRoutes = Router();

// CONTROLLERS
const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

// ROUTES
specificationsRoutes.post("/", createSpecificationController.handle);

specificationsRoutes.get("/", listSpecificationsController.handle);

export { specificationsRoutes };
