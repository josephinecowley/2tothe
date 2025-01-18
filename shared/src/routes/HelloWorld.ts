import { z } from "zod";
import { Route } from "../routing";

export const helloWorldRoute: Route<{ name: string }, { message: string }> = {
  path: "/hello-world",
  method: "get",
  req: z.object({ name: z.string() }),
  res: z.object({ message: z.string() }),
};
