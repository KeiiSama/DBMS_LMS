let express = require("express");
let userRouter = express.Router();
const userController = require("../controllers/user.controller")

userRouter.get("/all", userController.getAllUsers);
// userRouter.get("/:id", userController.getBookDetails);
userRouter.post("/", userController.createNewUser);
userRouter.put("/:id", userController.updateUser);
userRouter.patch("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);
module.exports = userRouter;
