import { Interceptor } from "./Interceptor.js";
import { Request, Response } from "@paperback/types";
import { CloudflareInterceptor, CloudflareOptions } from "./CloudflareInterceptor.js";
import { HttpErrorInterceptor } from "./HttpErrorInterceptor.js";

export class CompositeInterceptor extends Interceptor {
  cloudflareOptions: CloudflareOptions = {};
  protected defaultInterceptors: Interceptor[] = [
    new CloudflareInterceptor(this.cloudflareOptions),
    new HttpErrorInterceptor(),
  ];
  private readonly interceptors: Interceptor[] = [];
  constructor(interceptors: Interceptor[] = [], cloudflareOptions: CloudflareOptions = {}) {
    super();
    this.interceptors = interceptors;
    this.cloudflareOptions = cloudflareOptions;
  }

  protected async interceptResponse(req: Request, res: Response, data: ArrayBuffer) {
    let current = data;
    for (const interceptor of [...this.defaultInterceptors, ...this.interceptors]) {
      current = await interceptor.intercept(req, res, current);
    }

    return current;
  }
}
