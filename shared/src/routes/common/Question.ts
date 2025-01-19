import { z } from "zod";

export interface IQuestion {
  id: string;
  text: string;
  choiceA: string;
  choiceB: string;
}

export const ZodQuestion: z.ZodType<IQuestion> = z.object({
  id: z.string(),
  text: z.string(),
  choiceA: z.string(),
  choiceB: z.string(),
});
