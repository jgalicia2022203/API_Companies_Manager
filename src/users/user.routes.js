import { Router } from "express";
import { check } from "express-validator";
import { existsEmail, existsUsername } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import {
  companiesGet,
  createCompany,
  editCompany,
  register,
  reportExcel,
} from "./user.controller.js";

const router = Router();

router.post(
  "/register",
  [
    check("username", "username cannot be empty").not().isEmpty(),
    check("username").custom(existsUsername),
    check("email", "email cannot be empty").not().isEmpty(),
    check("email").custom(existsEmail),
    check("password", "password cannot be empty").not().isEmpty(),
    validateFields,
  ],
  register
);

router.get("/companies", validateJWT, companiesGet);

router.post(
  "/companies",
  validateJWT,
  [
    check("name", "name cannot be empty").not().isEmpty(),
    check("trajectory", "trajectory cannot be empty").not().isEmpty(),
    check("impact", "impact cannot be empty").not().isEmpty(),
    check("category", "category cannot be empty").not().isEmpty(),
    validateFields,
  ],
  createCompany
);

router.put(
  "/companies/:id",
  validateJWT,
  [
    check("name", "name cannot be empty").not().isEmpty(),
    check("trajectory", "trajectory cannot be empty").not().isEmpty(),
    check("impact", "impact cannot be empty").not().isEmpty(),
    check("category", "category cannot be empty").not().isEmpty(),
    validateFields,
  ],
  editCompany
);

router.get("/report", reportExcel);

export default router;
