import express, { Router } from "express";
import { getUserProfile, updateUserProfile } from "../controllers/user";

const router = express.Router();
router.post("/user/profile", getUserProfile)
router.put('/user/update', updateUserProfile)
export default router;