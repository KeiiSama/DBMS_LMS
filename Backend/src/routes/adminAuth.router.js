let express = require("express");
let adminAuthController = require("../controllers/adminAuth.controller");
let adminAuthRouter = express.Router();

adminAuthRouter.post("/Adminsignup", adminAuthController.signup);
adminAuthRouter.post("/Adminlogin", adminAuthController.login);
module.exports = adminAuthRouter;
