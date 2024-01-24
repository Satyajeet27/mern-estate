import { Router } from "express";
import { createListing } from "../controller/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router= Router()

router.post("/create",verifyToken, createListing)

export default router