import { ConfigService } from '@nestjs/config';
import * as path from 'node:path';
import { DataSource } from "typeorm"

export const databaseProviders = [
  {
    provide: 'DATABASE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        entities: [path.resolve(path.join(__dirname, '../', '/**/*.model{.ts,.js}'))],
        synchronize: configService.get('DB_SYNC') === 'true' ? true : false,
        logging: configService.get('DB_LOGG') === 'true' ? true : false,
      });

      return dataSource.initialize();
    }
  }
]