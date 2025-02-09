// src/users/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';  // Your User model

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // Create new user
  async createUser(email: string, password: string, name: string): Promise<User> {
    const newUser = new this.userModel({ email, password, name });
    return newUser.save();
  }
}
