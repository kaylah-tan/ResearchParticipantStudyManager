import { Request, Response, NextFunction, RequestHandler } from "express";
import prisma from "../prismaClient";

// Get all studies
export const getStudies: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const studies = await prisma.study.findMany();
    res.json(studies);
  } catch (error) {
    console.error("Error fetching studies:", error);
    next(error);
  }
};

// Get only the description of a specific study by ID
export const getStudyDescription: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const study = await prisma.study.findUnique({
      where: { id },
      select: { description: true },
    });
    if (!study) {
      res.status(404).json({ error: "Study not found" });
      return;
    }
    res.json(study);
  } catch (error) {
    console.error("Error fetching study description:", error);
    next(error);
  }
};

export const getStudyByUserId: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const studies = await prisma.study.findMany({
      where: { primaryInvestigatorId: id },
    });
    res.json(studies);
  } catch (error) {
    console.error("Error fetching studies by user ID:", error);
    next(error);
  }
};





// Get studies by participant user ID
export const getStudyByParticipantId: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const studies = await prisma.study.findMany({
      where: { participants: { some: { id } } },
    });
    res.json(studies);
  } catch (error) {
    console.error("Error fetching studies by participant ID:", error);
    next(error);
  }
};

// Get studies by primary investigator's user email
export const getStudyByUserEmail: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { email } = req.params;
    const studies = await prisma.study.findMany({
      where: { primaryInvestigator: { user: { email } } },
    });
    res.json(studies);
  } catch (error) {
    console.error("Error fetching studies by user email:", error);
    next(error);
  }
};

// Get a study by its ID
export const getStudyByID: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const study = await prisma.study.findUnique({
      where: { id },
    });
    if (!study) {
      res.status(404).json({ error: "Study not found" });
      return;
    }
    res.json(study);
  } catch (error) {
    console.error("Error fetching study:", error);
    next(error);
  }
};

// Add a new study
export const addStudy: RequestHandler = async (req, res, next): Promise<void> => {
  const {
    title,
    description,
    modules,
    irbStatus,
    status,
    published,
    maxParticipants,
    creditValue,
    restrictions,
    links,
    department,
    primaryInvestigatorId,
  } = req.body;
  try {
    const newStudy = await prisma.study.create({
      data: {
        title,
        description,
        modules,
        irbStatus,
        status,
        published,
        maxParticipants,
        creditValue,
        restrictions,
        links,
        department,
        primaryInvestigatorId,
      },
    });
    res.status(201).json(newStudy);
  } catch (error) {
    console.error("Error creating study:", error);
    next(error);
  }
};

// Update an existing study
export const updateStudy: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedStudy = await prisma.study.update({
      where: { id },
      data: updatedData,
    });
    res.json(updatedStudy);
  } catch (error) {
    console.error("Error updating study:", error);
    next(error);
  }
};

// Delete a study by ID
export const deleteStudy: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.study.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting study:", error);
    next(error);
  }
};
