import { Request, Response, CloudflareError } from "@paperback/types";
import { Interceptor } from "./Interceptor.js";

export class CloudflareInterceptor extends Interceptor {
  constructor() {
    super();
  }

  protected async interceptResponse(
    request: Request,
    response: Response,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    const cfMitigated = response.headers?.["cf-mitigated"];
    if (cfMitigated === "challenge") {
      throw new CloudflareError({
        url: request.url,
        method: "GET",
        headers: {
          "user-agent": await Application.getDefaultUserAgent(),
        },
      });
    }

    return data;
  }
}
