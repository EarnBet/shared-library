import { RequestContext } from "./interfaces";

export function getIpAddress(request: RequestContext): string {
  const forwardedForIps = request.headers["x-forwarded-for"] as string;

  const firstForwardedForIp = forwardedForIps
    ? forwardedForIps.split(",")[0].trim()
    : null;

  return firstForwardedForIp || request.ip;
}
