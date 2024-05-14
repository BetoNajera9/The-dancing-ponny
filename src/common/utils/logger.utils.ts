import winston from "winston";

const { combine, colorize, timestamp, prettyPrint, printf } = winston.format
/**
 * Customized logger for better control of them
 *
 * @param  {string} service - Label name
 */
export class Logger {
  readonly service: string

  readonly logger: winston.Logger = winston.createLogger({
    format: combine(
      timestamp({
        format: 'DD-MM-YYYY HH:mm:ss'
      }),
      prettyPrint(),
      colorize({ all: true }),
      printf(
        info => `${info.timestamp} [${info.label}]: ${info.message}`
      )
    ),
    transports: [new winston.transports.Console()]
  })

  constructor(service: string) {
    this.service = service
  }

  /**
   * Error log
   *
   * @param  {any} message
   */
  error(message: any) {
    this.logger.log({
      level: 'error',
      label: this.service,
      message
    })
  }

  /**
   * Wrning log
   *
   * @param  {any} message
   */
  warn(message: any) {
    this.logger.log({
      level: 'warn',
      label: this.service,
      message
    })
  }

  /**
   * Info log
   *
   * @param  {any} message
   */
  log(message: any) {
    this.logger.log({
      level: 'info',
      label: this.service,
      message
    })
  }
}