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

	/**
	 * Url of the database the service will connect to
	 *
	 * @example mongodb+srv://root:<password>@cluster0.ab1cd.mongodb.net/myDatabase?retryWrites=true&w=majority
	 */
	DATABASE_URL: string

	/**
	 * Jwt secret to encrypt tokens
	 *
	 * @example imcoihjc89hyva5sfx76gudd3d...
	 */
	JWT_SECRET: string

	/**
	 * Time at which token expires, expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js)
	 *
	 * @example 1h
	 */
	JWT_EXPIRES: string
}

const envSchema = Joi.object({
	PORT: Joi.number().required(),
	SERVER: Joi.string().optional(),

	DATABASE_URL: Joi.string().required(),

	JWT_SECRET: Joi.string().required(),
	JWT_EXPIRES: Joi.string().required(),
}).unknown(true)

const { error, value } = envSchema.validate(process.env)

if (error) throw new Error(`Envs config validation error: ${error.message}`)

const envVars: EnvVars = value

export const envs = {
	port: envVars.PORT,
	server: envVars.SERVER,

	databaseUrl: envVars.DATABASE_URL,

	jwtSecret: envVars.JWT_SECRET,
	jwtExpires: envVars.JWT_EXPIRES,
}
