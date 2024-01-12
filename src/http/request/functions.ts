import { RequestContext } from "./interfaces";

export function getIpAddress(request: RequestContext): string {
  return (request.headers["x-forwarded-for"] as string) || request.ip;
}
