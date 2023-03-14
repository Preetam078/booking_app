import express from "express"
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotel, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/",verifyAdmin, createHotel)


//update 
router.put("/:id",verifyAdmin, updateHotel)



//delete
router.delete("/:id",verifyAdmin, deleteHotel)


//get
router.get("/:id", getHotel)


//getall 
router.get("/", getAllHotels)


router.get("/find/countByCity", countByCity)
router.get("/find/countByType", countByType)


export default router;