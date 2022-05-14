import express from "express";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
import { SubmitFeedbackUseCase } from "./use-cases/submitFeedbackUseCase";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prismaFeedbacksRepository";

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "97b9a0db697ad0",
    pass: "22c11c3b974ad8"
  }
});

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbacksRepository();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbackRepository);

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  });
  /*
  await transport.sendMail({
    from: "Equipe Feedget <oi@feedget.com>",
    to: "Ricardo Lopes <prslopes1@gmail.com>",
    subject: "Novo feedback do usuário",
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo do feedback: ${type} </p>`,
      `<p>Comentário: ${comment} </p>`,
      `</div>`
    ].join("\n")
  });
  */
  return res.status(201).send();
});
