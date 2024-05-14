import * as Joi from 'joi'
import 'dotenv/config'

interface EnvVars {
  /**
   * Port where the service runs
   *
   * @example 3000
   */
  PORT: number

  /**
   * Url where the service runs
   *
   * @example http://localhost:3000
   */
  SERVER: string
}

const envSchema = Joi.object({
  PORT: Joi.number().required(),
  SERVER: Joi.string().optional()
}).unknown(true)

const { error, value } = envSchema.validate(process.env)

if (error) throw new Error(`Envs config validation error: ${error.message}`)

const envVars: EnvVars = value

export const envs = {
  port: envVars.PORT,
  server: envVars.SERVER
}
