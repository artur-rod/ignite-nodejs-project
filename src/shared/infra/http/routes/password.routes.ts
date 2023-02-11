import { Router } from "express";

import { ForgotPasswordMailController } from "@modules/accounts/useCases/forgotPasswordMail/ForgotPasswordMailController";
import { ResetPasswordController } from "@modules/accounts/useCases/resetPassword/ResetPasswordController";

const passwordRoutes = Router();

// CONTROLLERS
const forgotPasswordMailController = new ForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

// ROUTES
passwordRoutes.post("/forgot", forgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };
