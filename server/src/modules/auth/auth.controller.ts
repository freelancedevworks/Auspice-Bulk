import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminSignupDto, AdminLoginDto } from '../admin/dto/admin-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() adminDto: AdminSignupDto) {
    return this.authService.signup(adminDto);
  }

  @Post('login')
  async login(@Body() adminDto: AdminLoginDto) {
    return this.authService.login(adminDto);
  }
}
