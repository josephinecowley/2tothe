import { z } from "zod";
// From @types/express-serve-static-core/index.d.ts:IRouterMatcher
type Methods = "all" | "get" | "post" | "put" | "delete" | "patch" | "options" | "head";

export type Route<Req, Res> = {
  path: string;
  method?: Methods;
  req: z.ZodType<Req>;
  res: z.ZodType<Res>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Req<T extends Route<any, any>> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Route<infer X, any> ? X : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Res<T extends Route<any, any>> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Route<any, infer X> ? X : never;
