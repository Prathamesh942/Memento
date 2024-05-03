import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addNewEntry, deleteEntry, fetchEntry, updateEntry } from "../controllers/entry.controller.js";

const router = Router();

router.route("/new").post(verifyJWT, addNewEntry);

router.route("/update").post(verifyJWT, updateEntry);

router.route("/delete").post(verifyJWT, deleteEntry);

router.route("/find").post(verifyJWT, fetchEntry)

export default router;