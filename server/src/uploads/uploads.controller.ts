import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Res() res,
  ) {
    try {
      console.log('file', file);
      if (!file) {
        return res.status(400).json({
          message: 'No file uploaded',
        });
      }

      const result = await this.uploadsService.uploadPublicFile(
        file.buffer,
        file.originalname,
        req.user.id
      );

      return res.status(200).json({
        message: 'File uploaded successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error uploading file',
        error: error.message || 'Unknown error occurred',
      });
    }
  }

  @Get('/userfiles')
  @UseGuards(JwtAuthGuard)
  async getUserFiles(@Req() req) {
    return this.uploadsService.getUserFiles(req.user.id);
  }
  
}
