import { Request, Response, CloudflareError } from "@paperback/types";
import {Interceptor} from "./types.js";

/**
 * `url`: url of request,
 *
 * `userAgent`: the useragent to be used, if not provided `Application.getDefaultUserAgent()` will be used
 */
type CloudflareOptions = {
	url: string;
	userAgent?: string;
};

/**
 * Intercept the Cloudflare error on a response
 */
export function cloudflareInterceptor(options: CloudflareOptions): Interceptor {
	return async function interceptResponse(
		_: Request,
		response: Response,
		data: ArrayBuffer
	): Promise<ArrayBuffer> {
		const cfMitigated = response.headers?.["cf-mitigated"];

		if (cfMitigated === "challenge") {
			throw new CloudflareError({
				url: options.url,
				method: "GET",
				headers: {
					"user-agent": options?.userAgent
						? options.userAgent
						: await Application.getDefaultUserAgent(),
				},
			});
		}
		return data;
	};
}