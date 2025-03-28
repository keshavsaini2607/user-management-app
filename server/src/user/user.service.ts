import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return `This action returns all userss`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async getProfile(id: string) {
    const user = await this.databaseService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new UnauthorizedException(`User not found`);
    }
    delete user.password;
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDTO) {
    const userExists = await this.databaseService.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException(`User not found`);
    }

    const updateRes = await this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });

    const { password, ...result } = updateRes;
    return result;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
