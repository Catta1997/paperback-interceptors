import { Interceptor } from "./types.js";

/**
 * Intercept an Http Error on a response and throw a specific error
 */
export function httpErrorInterceptor(): Interceptor {
	return async (_, response, data) => {
		const status = response.status;
		if (status >= 400 && status < 500) {
			throw new Error(`Client error (HTTP ${status})`);
		}
		if (status >= 500) {
			throw new Error(`Server error (HTTP ${status})`);
		}
		return data;
	};
}