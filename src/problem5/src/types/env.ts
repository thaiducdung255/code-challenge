export const envNames = [
  'PORT',
  'POSTGRESQL_USERNAME',
  'POSTGRESQL_PASSWORD',
  'POSTGRESQL_DATABASE',
  'POSTGRESQL_HOST',
  'POSTGRESQL_PORT',
] as const

export type Env = (typeof envNames)[number]
