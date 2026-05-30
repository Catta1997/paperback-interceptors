import { Request, Response } from "@paperback/types";

export abstract class Interceptor {
  async intercept(request: Request, response: Response, data: ArrayBuffer): Promise<ArrayBuffer> {
    return this.interceptResponse(request, response, data);
  }

  protected abstract interceptResponse(
    request: Request,
    response: Response,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer>;
}
