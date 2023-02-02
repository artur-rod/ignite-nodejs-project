import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { RentalDevolutionController } from "@modules/rentals/useCases/rentalDevolution/RentalDevolutionController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

// CONTROLLERS
const createRentalController = new CreateRentalController();
const rentalDevolutionController = new RentalDevolutionController();
const listRentalsByUserController = new ListRentalsByUserController();

// ROUTES
rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);

rentalsRoutes.post(
  "/:id/devolution",
  ensureAuthenticated,
  rentalDevolutionController.handle
);

rentalsRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalsRoutes };
