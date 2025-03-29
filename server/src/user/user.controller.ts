import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { UpdateUserDTO, updateUserSchema } from './dto/updateUser.dto';
import { ZodValidationPipe } from 'src/pipes/zodValidationPipe';

@Controller('user')
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return this.userService.getProfile(req.user.id);
  }

  @Post('/deleteUser')
  @UseGuards(JwtAuthGuard)
  remove(@Req() req, @Body() body: any) {
    return this.userService.remove(req.user.id, body.deleteUserId);
  }

  @Get('/listall')
  @UseGuards(JwtAuthGuard)
  listAllUsers(@Req() req) {
    return this.userService.listAllUsers(req.user.id);
  }

  @Patch('/updaterole')
  @UseGuards(JwtAuthGuard)
  updateRole(@Req() req, @Body() body: any) {
    return this.userService.updateRole(
      req.user.id,
      body.updatingUserId,
      body.role,
    );
  }
}
