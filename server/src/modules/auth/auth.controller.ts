import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminSignupDto, AdminLoginDto } from '../admin/dto/admin-auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('admin/signup')
  async adminSignup(@Body() adminDto: AdminSignupDto) {
    return this.authService.signup(adminDto);
  }

  @Post('admin/login')
  async adminLogin(@Body() adminDto: AdminLoginDto) {
    return this.authService.login(adminDto);
  }
}
