import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Admin } from '../admin/admin.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AdminSignupDto, AdminLoginDto } from '../admin/dto/admin-auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signup(adminDto: AdminSignupDto): Promise<Partial<Admin>> {
    const hashedPassword = await bcrypt.hash(adminDto.password, 10);

    // Create an instance of the Admin model without saving it immediately
    const admin = Admin.build({
      username: adminDto.username,
      email: adminDto.email,
      password: hashedPassword,
    });

    // Save the instance to the database
    await admin.save();

    return { id: admin.id, username: admin.username, email: admin.email };
  }

  async login(adminDto: AdminLoginDto): Promise<{ token: string }> {
    const admin = await Admin.findOne({ where: { email: adminDto.email } });

    if (!admin || !(await bcrypt.compare(adminDto.password, admin.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ id: admin.id, email: admin.email });
    return { token };
  }
}
