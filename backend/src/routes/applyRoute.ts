import { NextFunction, Request, RequestHandler, Response, Router } from "express";
import { ZodError } from "zod";
import { Route, ResponseError, IResponseError, ErrorCode } from "@2tothe/shared";

const fmtError = (ze: ZodError) => {
  const issues = ze.issues;

  if (!issues.length) return "Validation error (unknown)";

  const firstIssue = issues[0];
  return `Validation error on field "${firstIssue.path}": ${firstIssue.message} (${firstIssue.code})`;
};

const handleError = (e: ResponseError | any, res: Response<IResponseError>) => {
  const isResponseError = e instanceof ResponseError;
  const isZodError = e.name === "ZodError";

  console.error(isZodError ? fmtError(e) : e);

  if (isResponseError) {
    return res.status(e.status).json({
      status: e.status,
      message: e.message,
      errorCode: e.errorCode,
    });
  }
  if (isZodError) return res.status(400).json({ status: 400, errorCode: ErrorCode.MissingField, message: fmtError(e) });

  return res.status(500).json({ status: 500, errorCode: ErrorCode.InternalError });
};

export type Handler<Req, Res> = (body: Req, req: Request) => Promise<Res>;
export function applyRoute<RouteReq, RouteRes>(
  router: Router,
  routeSpec: Route<RouteReq, RouteRes>,
  ...middlewares: RequestHandler[]
) {
  const method = routeSpec.method || "post";

  router[method](
    routeSpec.path,
    ...(middlewares ?? []).map((middleware) => async (req: Request, res: Response, next: NextFunction) => {
      try {
        await middleware(req, res, next);
      } catch (e) {
        handleError(e, res);
      }
    }),
  );

  return {
    use: (handler: Handler<RouteReq, RouteRes>) => {
      router[method](routeSpec.path, async (req: Request, res: Response) => {
        try {
          const body = await routeSpec.req.parseAsync(req.body);

          const resJSONRaw = await handler(body, req);
          const resJSON = await routeSpec.res.parseAsync(resJSONRaw);

          res.status(200).json(resJSON);
        } catch (e) {
          handleError(e, res);
        }
      });
    },
  };
}
