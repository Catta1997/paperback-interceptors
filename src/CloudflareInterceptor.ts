import { Request, Response, CloudflareError } from "@paperback/types";
import { Interceptor } from "./Interceptor.js";

export type CloudflareOptions = {
  url?: string;
  userAgent?: string;
};

export class CloudflareInterceptor extends Interceptor {
  url: string | null = null;
  userAgent: string | null = null;
  constructor(cloudflareOptions: CloudflareOptions) {
    super();
    this.url = cloudflareOptions?.url ?? null;
    this.userAgent = cloudflareOptions?.userAgent ?? null;
  }

  protected async interceptResponse(
    request: Request,
    response: Response,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    const cfMitigated = response.headers?.["cf-mitigated"];
    if (cfMitigated === "challenge") {
      throw new CloudflareError({
        url: this.url ? this.url : request.url,
        method: "GET",
        headers: {
          "user-agent": this.userAgent ? this.userAgent : await Application.getDefaultUserAgent(),
        },
      });
    }

    return data;
  }
}
