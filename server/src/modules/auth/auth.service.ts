/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Admin } from '../admin/admin.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AdminSignupDto, AdminLoginDto } from '../admin/dto/admin-auth.dto';
import { Op } from 'sequelize';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(adminDto: AdminSignupDto): Promise<Partial<Admin>> {
    try {
      const companyKey = this.configService.get<string>('COMPANY_SECRET_KEY');

      // Add this logging to debug
      console.log('Received key:', adminDto.companySecretKey);
      console.log('Expected key:', companyKey);

      if (!companyKey) {
        throw new InternalServerErrorException(
          'Company secret key not configured',
        );
      }

      if (adminDto.companySecretKey !== companyKey) {
        throw new UnauthorizedException('Invalid company secret key');
      }

      const hashedPassword = await bcrypt.hash(adminDto.password, 10);

      const admin = Admin.build({
        username: adminDto.username,
        email: adminDto.email,
        password: hashedPassword,
      });

      await admin.save();

      return { id: admin.id, username: admin.username, email: admin.email };
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new UnauthorizedException('Username or email already exists');
      }
      console.error('Signup error:', error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async login(adminDto: AdminLoginDto): Promise<{ token: string }> {
    try {
      const admin = await Admin.findOne({
        where: {
          [Op.or]: [
            { email: adminDto.identifier },
            { username: adminDto.identifier },
          ],
        },
      });

      if (
        !admin ||
        !(await bcrypt.compare(adminDto.password, admin.password))
      ) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = this.jwtService.sign({
        id: admin.id,
        email: admin.email,
        username: admin.username,
      });

      return { token };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
