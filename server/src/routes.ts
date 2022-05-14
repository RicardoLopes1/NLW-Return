import express from "express";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
import { SubmitFeedbackUseCase } from "./use-cases/submitFeedbackUseCase";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prismaFeedbacksRepository";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailerMailAdapter";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  });
  
  return res.status(201).send();
});
