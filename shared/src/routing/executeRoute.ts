import fetch from "cross-fetch";
import { Route } from ".";
import { IResponseError } from "../errors/ResponseError";

let backendURL = "";

export function setBackendURL(url: string) {
  if (backendURL !== "") console.warn(`The backend URL has already been set before (currently ${backendURL})`);
  backendURL = url;
}

type ExecuteRouteResponse<RouteRes> =
  | {
      ok: true;
      status: number;
      json: RouteRes;
    }
  | {
      ok: false;
      status: number;
      error: IResponseError;
    };

export async function executeRoute<RouteReq, RouteRes>(
  route: Route<RouteReq, RouteRes>,
  body: RouteReq,
): Promise<ExecuteRouteResponse<RouteRes>> {
  const { method = "post" } = route;
  const bodyField =
    method === "get" || method === "head" ? {} : { body: body instanceof FormData ? body : JSON.stringify(body) };

  const response = await fetch(backendURL + route.path, {
    method: method.toUpperCase(),
    ...bodyField,
    ...{
      ...(!(body instanceof FormData)
        ? {
            headers: {
              "Content-Type": "application/json",
            },
          }
        : {}),
    },
    credentials: "include",
  });

  const { status, ok } = response;
  const jsonRaw = await response.json();

  if (!ok) return { status, ok, error: jsonRaw };

  const json = await route.res.parseAsync(jsonRaw);
  return { status, ok, json };
}
