import pino, { Logger } from "pino";

export function createLogger(name: string): Logger {
	return pino({
		name,
		transport: {
			target: "pino-pretty",
			options: {
				colorize: true,
			},
		},
	});
}
