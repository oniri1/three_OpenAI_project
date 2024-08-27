import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './routers/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AiModule } from './routers/ai/ai.module';
import { SessionMiddleware } from './middleware/session.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/OpenAI'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
