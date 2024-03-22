let express = require("express");
let authController = require("../controllers/auth.controller");
let authRouter = express.Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
module.exports = authRouter;
