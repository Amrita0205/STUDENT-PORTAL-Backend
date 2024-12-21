import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.schema'; // Import User model
import { RegisterDto } from './dto/register.dto'; // Create DTOs for registration and login requests
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Validate user credentials during login
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      //   const { password, ...result } = user.toObject();
      //   return result;
      const result = user.toObject();
      delete result.password; // Remove password field from the user object
      return result;
    }
    return null; // Return null if user doesn't exist or passwords don't match
  }

  // Handle user login and generate JWT token
  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // Unauthorized if invalid credentials
    }
    const payload = { email: user.email, sub: user._id }; // User payload for JWT
    const access_token = this.jwtService.sign(payload);
    return { access_token }; // Return JWT token
  }

  // Handle user registration
  async register(registerDto: RegisterDto): Promise<User> {
    const { email, password, name } = registerDto;
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already registered'); // Conflict if email already exists
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password before saving
    const user = await this.userService.createUser(email, hashedPassword, name); // Create new user
    return user;
  }
}
