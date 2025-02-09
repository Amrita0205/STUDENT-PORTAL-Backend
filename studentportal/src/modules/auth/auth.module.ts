import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/user.module';
import * as dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file

// console.log('MONGO_URI:', process.env.MONGO_URI);  // Log MONGO_URI to verify it's loaded
// console.log('JWT_SECRET:', process.env.JWT_SECRET);  // Log JWT_SECRET to verify it's loaded

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
    //   secret: 'STUDENT-PORTAL-SECRET',
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
