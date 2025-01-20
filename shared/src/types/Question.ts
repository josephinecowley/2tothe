import { z } from "zod";

interface IBaseQuestion {
  id: string;
  text: string;
  choiceA: string;
  choiceB: string;
  timeless: boolean;
  publicNumber: number;
}

const ZodBaseQuestion: z.ZodType<IBaseQuestion> = z.object({
  id: z.string(),
  text: z.string(),
  choiceA: z.string(),
  choiceB: z.string(),
  timeless: z.boolean(),
  publicNumber: z.number(),
});

export { IBaseQuestion, ZodBaseQuestion };
