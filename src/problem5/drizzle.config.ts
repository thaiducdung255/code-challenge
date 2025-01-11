import { defineConfig } from 'drizzle-kit'
import { databaseUrl, partialDbUrl } from './src/db/conn'
import { createLogger } from './src/utils/logger'

const logger = createLogger('Drizzle')

logger.info(`Connected to db: ${partialDbUrl}`)

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
})
