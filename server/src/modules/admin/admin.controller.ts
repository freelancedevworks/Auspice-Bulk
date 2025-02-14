import {
  Controller,
  Get,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../../services/cloudinary.service';
import { Multer } from 'multer';
@Controller('api/admin')
@UseGuards(AuthGuard('jwt'))
export class AdminController {
  constructor(
    private adminService: AdminService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get('list')
  async getAllAdmins() {
    return this.adminService.findAll();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Multer.File) {
    const imageUrl = await this.cloudinaryService.uploadImage(file);
    return { url: imageUrl };
  }
}
