import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UploadsModule } from './uploads/uploads.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    UploadsModule,
    MulterModule.register({
      limits: { fileSize: 10 * 1024 * 1024 }, // Limit 10MB
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
