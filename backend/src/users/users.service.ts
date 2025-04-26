/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { MfaOtp } from '../mfa-otp/entities/mfa-otp.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(MfaOtp)
    private readonly mfaOtpRepository: Repository<MfaOtp>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
        relations: ['mfaOtps'],
      });
      return user;
    } catch (error) {
      throw new HttpException(
        'Error finding user by email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException(' Email not found');
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return user;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new HttpException(
        'Error validating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ user: User; success: string }> {
    try {
      const existingUser = await this.findByEmail(createUserDto.email);
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const user = this.userRepository.create(createUserDto);
      user.createdAt = new Date();
      user.updatedAt = new Date();
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      user.password = hashedPassword;

      await this.userRepository.save(user);
      return { user, success: 'User created successfully' };
    } catch (error) {
      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async activateUser(userId: number): Promise<void> {
    try {
      await this.userRepository.update(userId, { isActive: true });
    } catch (error) {
      throw new HttpException(
        'Error activating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async markOtpAsVerified(email: string, otp: string): Promise<void> {
    try {
      const mfaOtp = await this.mfaOtpRepository.findOne({
        where: { email, otp },
        order: { created_at: 'DESC' },
        relations: ['user'],
      });

      if (mfaOtp) {
        mfaOtp.is_verified = true;
        // mfaOtp.userId = mfaOtp.user.id;
        await this.mfaOtpRepository.save(mfaOtp);
      }
    } catch (error) {
      throw new HttpException(
        'Error marking OTP as verified',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async incrementOtpAttempts(email: string, otp: string): Promise<void> {
    try {
      const mfaOtp = await this.mfaOtpRepository.findOne({
        where: { email, otp },
        order: { created_at: 'DESC' },
      });
      if (mfaOtp) {
        mfaOtp.attempts += 1;
        await this.mfaOtpRepository.save(mfaOtp);
      }
    } catch (error) {
      throw new HttpException(
        'Error incrementing OTP attempts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updatePassword(email: string, newPassword: string): Promise<void> {
    try {
      const user = await this.findByEmail(email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(
        'Error updating password',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateProfile(
    userId: number,
    updateProfileDto: UpdateUserDto,
  ): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (updateProfileDto.email && updateProfileDto.email !== user.email) {
        const existingUser = await this.findByEmail(updateProfileDto.email);
        if (existingUser) {
          throw new ConflictException('Email already in use');
        }
        user.email = updateProfileDto.email;
      }

      if (updateProfileDto.name) {
        user.name = updateProfileDto.name;
      }
      user.updatedAt = new Date();
      return this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(
        'Error updating profile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        select: [
          'id',
          'name',
          'email',
          'password',
          'createdAt',
          'updatedAt',
          'role',
          'isActive',
        ],
      });
    } catch (error) {
      throw new HttpException(
        'Error retrieving users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
}
