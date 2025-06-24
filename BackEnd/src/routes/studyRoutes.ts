import { Router } from "express";
import {
  getStudies,
  getStudyDescription,
  getStudyByUserEmail,
  getStudyByID,
  addStudy,
  updateStudy,
  deleteStudy,
  getStudyByUserId,
  getStudyByParticipantId,
} from "../controllers/studyController";

const router = Router();

// Get all studies
router.get("/studies", getStudies);

// Get studies by primary investigator's email (place before dynamic :id routes)
router.get("/studies/user/:email", getStudyByUserEmail);

// Additional endpoints for lookup by user ID or participant ID
router.get("/studies/user/id/:id", getStudyByUserId);
router.get("/studies/participant/:id", getStudyByParticipantId);

// Get only the description of a study by ID
router.get("/studies/:id/description", getStudyDescription);

// Get a study by ID
router.get("/studies/:id", getStudyByID);

// Add a new study
router.post("/studies", addStudy);

// Update a study by ID
router.put("/studies/:id", updateStudy);

// Delete a study by ID
router.delete("/studies/:id", deleteStudy);

export default router;
