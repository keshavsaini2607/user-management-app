import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
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

  @Get()
  findAllOrByEmail(@Query('email') email?: string) {
    if (email) {
      return this.userService.findByEmail(email);
    }
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return this.userService.getProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  @Patch()
  update(@Req() req, @Body() updateUserDto: UpdateUserDTO) {
    const id = req.user.id;
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
