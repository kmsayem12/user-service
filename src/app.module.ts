import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserService } from './services/user.service';
import { mongodbConfig } from './config/mongodb.config';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot(mongodbConfig.uri, {
      authSource: 'admin',
      auth: {
        username: mongodbConfig.user,
        password: mongodbConfig.password,
      },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
