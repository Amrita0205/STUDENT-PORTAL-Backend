import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // Pass the entire DTO object to the service method
    return this.authService.register(registerDto);  // Pass registerDto directly
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // Pass the entire DTO object to the service method
    return this.authService.login(loginDto);  // Pass loginDto directly
  }
}
