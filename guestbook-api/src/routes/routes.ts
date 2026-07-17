import { Router } from "express";
import * as controllers from "../controllers/controllers.js";

const router = Router();

//get routes
router.get("/", controllers.renderHome);
// router.get("/api/questions", controllers.getQuestions)
router.get("/api/answers", controllers.getAnswers)

//post routes
router.post("/api/answers", controllers.postAnswer)
router.post("/api/replies", controllers.postReply)

//put routes
router.put("/api/answers/:id", controllers.updateAnswer)


export default router;  