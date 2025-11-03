import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('ENTER_YOUR_MONGODB_CONNECTION_STRING_HERE'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
