import mongoose from 'mongoose';

import { Logger, ServiceException } from '../common/utils';
import { envs } from '../config';

export class MongoLib {
  private connection: mongoose.Connection | null = null
  private readonly url: string
  private logger = new Logger('MongooseService')

  constructor() {
    this.url = envs.databaseUrl
    this.connect()
  }

  public async connect(): Promise<void> {
    if (!this.connection) {
      try {
        await mongoose.connect(this.url, {
          maxPoolSize: 4
        });

        this.connection = mongoose.connection;

        this.logger.log('Database connected')
      } catch (error) {
        this.logger.error(error)
      }
    }

  }

  public getConnection(): mongoose.Connection {
    if (!this.connection) {
      throw new ServiceException({
        name: 'DATABASE_NO_CONNECTION',
        message: 'The connection to the database has not been established'
      });
    }

    return this.connection;
  }
}