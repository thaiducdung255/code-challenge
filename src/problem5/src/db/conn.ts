import { drizzle } from 'drizzle-orm/node-postgres'
import { getEnvOrThrow } from '@config/env'
const dbUsername = getEnvOrThrow('POSTGRESQL_USERNAME')
const dbPwd = getEnvOrThrow('POSTGRESQL_PASSWORD')
const dbHost = getEnvOrThrow('POSTGRESQL_HOST')
const dbPort = getEnvOrThrow('POSTGRESQL_PORT')
const dbName = getEnvOrThrow('POSTGRESQL_DATABASE')

export const partialDbUrl = `${dbHost}:${dbPort}/${dbName}`
export const databaseUrl = `postgresql://${dbUsername}:${dbPwd}@${partialDbUrl}`
export const db = drizzle(databaseUrl)
