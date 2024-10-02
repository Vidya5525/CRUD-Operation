import express from "express";
import {
  deleteCustomer,
  getAllCustomers,
  getSingleCustomer,
  loginUserData,
  newCustomer,
  updateCustomer,
} from "../controller/memberController.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .get(isAuthenticated, authorizeRoles("admin"), getAllCustomers);
router.route("/create").post(isAuthenticated, newCustomer);
router
  .route("/getUserData")
  .get(isAuthenticated, authorizeRoles("user"), loginUserData);
router
  .route("/getCustomer/:id")
  .get(getSingleCustomer)
  .put(updateCustomer)
  .delete(deleteCustomer);

export default router;
