import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from 'src/entity/user.entitiy';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // ConfigModule을 import하여 사용할 수 있도록 설정
      inject: [ConfigService], // ConfigService를 주입
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // 데이터베이스 유형
        host: configService.get<string>('DB_HOST'), // 데이터베이스 호스트
        port: configService.get<number>('DB_PORT'), // 데이터베이스 포트
        username: configService.get<string>('DB_USER'), // 데이터베이스 사용자 이름
        password: configService.get<string>('DB_PW'), // 데이터베이스 비밀번호
        database: configService.get<string>('DB_NAME'), // 사용할 데이터베이스 이름
        entities: [User], // 엔티티 정의
        synchronize: configService.get<boolean>('IS_DEV'),
        logging: configService.get<boolean>('LOG_ENABLE'),
        retryAttempts: 1,
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
