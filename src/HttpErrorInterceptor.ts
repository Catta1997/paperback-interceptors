import { Interceptor } from "./Interceptor.js";
import { Request, Response } from "@paperback/types";

export class HttpErrorInterceptor extends Interceptor {
  protected async interceptResponse(_: Request, response: Response, data: ArrayBuffer) {
    const status = response.status;

    if (status >= 400 && status < 500) {
      throw new Error(`Client error (Error: ${status})`);
    }

    if (status >= 500) {
      throw new Error(`Server error (Error: ${status})`);
    }

    return data;
  }
}
