import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from "@nestjs/config";


@Module({
  imports: [
      TypeOrmModule.forRoot(typeOrmConfig),
      AuthModule,
      TasksModule,
      ConfigModule.forRoot({
          isGlobal: true
      })
  ],
  controllers: [
      AppController
  ],
  providers: [AppService],
})
export class AppModule {}
