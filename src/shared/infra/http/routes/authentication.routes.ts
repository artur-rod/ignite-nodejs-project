import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/authenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

const authenticationRoutes = Router();

// CONTROLLERS
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

// ROUTES
authenticationRoutes.post("/sessions", authenticateUserController.handle);
authenticationRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticationRoutes };
