import { FeedbacksRepository } from "../repositories/feedbacksRepository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
} 

export class SubmitFeedbackUseCase {
  
  constructor(
    private readonly feedbacksRepository: FeedbacksRepository
  ) { }
  
  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbacksRepository.create({
      type: type,
      comment: comment,
      screenshot: screenshot
    });
  }
}