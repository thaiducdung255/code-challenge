import { Env } from '@interfaces/env'
import { createLogger } from '@utils/logger'

const logger = createLogger('Env')

export function getEnv(env: Env): string | undefined {
  const envStr = process.env[env]

  if (!envStr) {
    logger.warn(`Env ${env} has not been set`)
  }

  return envStr
}
export function getEnvOrThrow(env: Env): string {
  const envStr = process.env[env]

  if (!envStr) {
    logger.error(`Env ${env} has not been set`)
    throw new Error(`Cannot read value for env: ${env}`)
  }

  return envStr
}
