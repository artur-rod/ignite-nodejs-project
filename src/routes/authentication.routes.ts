import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticationRoutes = Router();

// CONTROLLERS
const authenticateUserController = new AuthenticateUserController();

// ROUTES
authenticationRoutes.post("/sessions", authenticateUserController.handle);

export { authenticationRoutes };
