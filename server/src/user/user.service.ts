import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

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

  async remove(id: string, deleteUserId: string) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { id },
      });
      if (!user || user.role !== 'admin') {
        throw new HttpException('You are not authorized to delete users', 403);
      }
      const userToDelete = await this.databaseService.user.findUnique({
        where: { id: deleteUserId },
      });
      if (!userToDelete) {
        throw new HttpException('User not found', 404);
      }
      const deleteRes = this.databaseService.user.delete({
        where: { id: deleteUserId },
      });
      return deleteRes;
    } catch (error) {
      return error;
    }
  }

  async listAllUsers(userId: string) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { id: userId },
      });
      if (!user || user.role !== 'admin') {
        throw new HttpException('You are not authorized to list users', 403);
      }
      const users = await this.databaseService.user.findMany({
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          username: true,
        },
      });

      if (!users) {
        throw new HttpException('No users found', 404);
      }
      const filtered = users.filter((u) => u.email !== user.email);
      return filtered;
    } catch (error) {
      return error;
    }
  }

  async updateRole(userId: string, id: string, role: string) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { id: userId },
      });
      if (!user || user.role !== 'admin') {
        throw new HttpException('You are not authorized to update users', 403);
      }
      const userToUpdate = await this.databaseService.user.findUnique({
        where: { id },
      });
      if (!userToUpdate) {
        throw new HttpException('User not found', 404);
      }
      const updateRes = await this.databaseService.user.update({
        where: { id },
        data: { role: role as Role },
      });
      const { password, ...result } = updateRes;
      return result;
    } catch (error) {
      return error;
    }
  }
}
