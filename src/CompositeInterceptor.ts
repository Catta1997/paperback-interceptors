import { Interceptor } from "./Interceptor.js";
import { Request, Response } from "@paperback/types";
import { CloudflareInterceptor } from "./CloudflareInterceptor.js";
import { HttpErrorInterceptor } from "./HttpErrorInterceptor.js";

export class CompositeInterceptor extends Interceptor {
  protected defaultInterceptors: Interceptor[] = [
    new CloudflareInterceptor(),
    new HttpErrorInterceptor(),
  ];
  private readonly interceptors: Interceptor[] = [];
  constructor(interceptors: Interceptor[]) {
    super();
    this.interceptors = interceptors;
  }

  protected async interceptResponse(req: Request, res: Response, data: ArrayBuffer) {
    let current = data;
    for (const interceptor of [...this.defaultInterceptors, ...this.interceptors]) {
      current = await interceptor.intercept(req, res, current);
    }

    return current;
  }
}
