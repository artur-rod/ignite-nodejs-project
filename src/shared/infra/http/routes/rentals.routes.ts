import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { RentalDevolutionController } from "@modules/rentals/useCases/rentalDevolution/RentalDevolutionController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

// CONTROLLERS
const createRentalController = new CreateRentalController();
const rentalDevolutionController = new RentalDevolutionController();

// ROUTES
rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post(
  "/:id/devolution",
  ensureAuthenticated,
  rentalDevolutionController.handle
);

export { rentalsRoutes };
