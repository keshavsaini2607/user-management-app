import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthJwtPayload } from './types/auth.jwtPayload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const isExistingUser = await this.databaseService.user.findFirst({
      where: { email: createUserDto.email },
    });
    if (isExistingUser) {
      throw new BadRequestException('User with this email already registered');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    const userInput: Prisma.UserCreateInput = {
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashedPassword, // Hash the password
      ...createUserDto,
    };

    const user = await this.databaseService.user.create({
      data: userInput,
    });
    delete user.password;
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return { id: user.id, email: user.email };
  }

  async login(userId: string) {
    const user = await this.databaseService.user.findUnique({
      where: { id: userId },
    });
    const payload: AuthJwtPayload = { sub: userId };
    const token = this.jwtService.sign(payload, { expiresIn: '10h' });

    const { password, ...rest } = user;

    return {
      user: rest,
      backendTokens: {
        token,
      },
    };
  }
}
