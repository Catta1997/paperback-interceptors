import { Request, Response } from "@paperback/types";

/**
 * Interceptor type
 */
export type Interceptor = (
	req: Request,
	res: Response,
	data: ArrayBuffer
) => Promise<ArrayBuffer>;