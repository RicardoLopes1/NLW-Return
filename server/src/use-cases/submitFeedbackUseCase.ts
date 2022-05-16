import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbacksRepository } from "../repositories/feedbacksRepository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
} 

export class SubmitFeedbackUseCase {
  
  constructor(
    private readonly feedbacksRepository: FeedbacksRepository,
    private readonly mailAdapter: MailAdapter
  ) { }
  
  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if(!type) {
      throw new Error("Type is required");
    }

    if(!comment) {
      throw new Error("Comment is required");
    }

    if(screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format");
    }

    await this.feedbacksRepository.create({
      type: type,
      comment: comment,
      screenshot: screenshot
    });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type} </p>`,
        `<p>Comentário: ${comment} </p>`,
        screenshot ? `<img src="${screenshot}" />` : "",
        `</div>`
      ].join("\n")
    });
  }
}