import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AdminSignupDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class AdminLoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
