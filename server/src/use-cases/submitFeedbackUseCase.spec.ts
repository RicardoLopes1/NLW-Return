import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendEmailSpy }
);

describe("Submit feedback", () => {
  it("should be abel to submit a feedback", async () => {
    
    await expect(submitFeedback.execute({ 
      type: "bug", 
      comment: "Tá tudo bugado",
      screenshot: "data:image/png;base64,screenshot.jpg"
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendEmailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit feedback without type", async () => {
    await expect(submitFeedback.execute({ 
      type: "",
      comment: "Tá tudo bugado",
      screenshot: "data:image/png;base64,screenshot.jpg"
    })).rejects.toThrow();
  });

  it("should not be able to submit feedback without comment", async () => {
    await expect(submitFeedback.execute({ 
      type: "bug",
      comment: "",
      screenshot: "data:image/png;base64,screenshot.jpg"
    })).rejects.toThrow();
  });

  it("should not be able to submit feedback with invalid screenshot format", async () => {
    await expect(submitFeedback.execute({ 
      type: "bug",
      comment: "Tá tudo bugado",
      screenshot: "screenshot.jpg"
    })).rejects.toThrow();
  });

});
