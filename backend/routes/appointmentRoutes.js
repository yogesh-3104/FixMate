import express from 'express'
const router = express.Router();
import {createAppointment, getAppointment,getMyAppointment,getProviderAppointment,updateAppointmentStatus, updateAppointment, deleteAppointment} from "../Controllers/appointmentController.js";
import { authenticate ,authorizeProvider} from  "../middleware/authentication.js";

router.post("/", authenticate, createAppointment);
router.get("/", authenticate,authorizeProvider, getAppointment);
router.get("/my", authenticate, getMyAppointment);
router.get("/provider", authenticate,authorizeProvider, getProviderAppointment);
router.put("/:id", authenticate,authorizeProvider, updateAppointment);
router.put("/:id/status", authenticate,authorizeProvider, updateAppointmentStatus);
router.delete("/:id", authenticate,authorizeProvider, deleteAppointment);

export default router;
