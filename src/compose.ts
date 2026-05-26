import { Interceptor } from "./types.js";

/**
 * Compose multiple Interceptors in one
 *
 * **WARNING:** If you want to use `cloudflareInterceptor`, this **MUST** be the first one of the params
 */
export function composeInterceptors(
	...interceptors: Interceptor[]
): Interceptor {
	return async (req, res, data) => {
		let current = data;
		for (const interceptor of interceptors) {
			current = await interceptor(req, res, current);
		}
		return current;
	};
}