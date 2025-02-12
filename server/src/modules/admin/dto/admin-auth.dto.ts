import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AdminSignupDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  companySecretKey: string;
}

export class AdminLoginDto {
  @IsNotEmpty()
  identifier: string; // This will be either email or username

  @IsNotEmpty()
  password: string;
}
