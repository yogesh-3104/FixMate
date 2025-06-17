import express from "express";
import {createService,getAllServices,getService,getProviderServices,updateService,deleteService} from "../Controllers/serviceController.js";
import {authenticate,authorizeProvider} from "../middleware/authentication.js";
const router = express.Router();

router.post("/",authenticate,authorizeProvider, createService);
router.get("/provider", authenticate, authorizeProvider, getProviderServices);
router.get("/" , getAllServices);
router.get("/:id" , getService);
// router.get("/provider", authenticate, authorizeProvider, getProviderServices);// if you do so then then express treat provider as an id show move it to the top it will work
router.put("/:id", authenticate, updateService);
router.delete("/:id", authenticate, deleteService);

export default router;
