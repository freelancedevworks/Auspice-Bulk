import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin.model';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { CloudinaryService } from 'src/services/cloudinary.service';
// Import CloudinaryService directly

@Module({
  imports: [
    SequelizeModule.forFeature([Admin]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, CloudinaryService], // Add CloudinaryService to the providers array
  exports: [AdminService],
})
export class AdminModule {}
