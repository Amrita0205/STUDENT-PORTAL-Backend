import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import * as dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file

console.log('MONGO_URI:', process.env.MONGO_URI);  // Log MONGO_URI to verify it's loaded
console.log('JWT_SECRET:', process.env.JWT_SECRET);  // Log JWT_SECRET to verify it's loaded

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // To load environment variables
    // MongooseModule.forRoot('mongodb://localhost:27017/student-portal'), // Connect to MongoDB
    MongooseModule.forRoot(process.env.MONGO_URI), // Connect to MongoDB
    AuthModule,
    UserModule,

  ],
})

export class AppModule {}