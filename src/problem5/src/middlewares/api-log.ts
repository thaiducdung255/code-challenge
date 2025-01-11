import { StatusCode } from "@constants/http-status-code";
import { createLogger } from "@utils/logger";
import { Request, Response, NextFunction } from "express";

const logger = createLogger("ApiLog");

export function apiLog(req: Request, res: Response, next: NextFunction): void {
	const startTime = Date.now();

	res.on("finish", () => {
		const durationMs = Date.now() - startTime;
		const method = req.method;
		const path = req.originalUrl;
		const code = res.statusCode;
		const msg = `[${code}] ${method} ${path} - ${durationMs}ms`;

		switch (true) {
			case code < StatusCode.BAD_REQUEST:
				logger.info(msg);
				break;

			case code < StatusCode.SERVER_ERROR:
				logger.warn(msg);
				break;

			case code >= StatusCode.SERVER_ERROR:
				logger.error(msg);
				break;
		}
	});

	next();
}
