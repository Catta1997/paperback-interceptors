import {Request, Response, CloudflareError, PaperbackInterceptor} from "@paperback/types";

export type CloudflareOptions = {
  url?: string;
  userAgent?: string;
};

export class CloudflareInterceptor extends PaperbackInterceptor {
  override async interceptRequest(request: Request): Promise<Request> {
      return request
  }
  url: string | null = null;
  userAgent: string | null = null;
  constructor(cloudflareOptions: CloudflareOptions, id:string) {
    super(id);
    this.url = cloudflareOptions?.url ?? null;
    this.userAgent = cloudflareOptions?.userAgent ?? null;
  }

  override async interceptResponse(
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
