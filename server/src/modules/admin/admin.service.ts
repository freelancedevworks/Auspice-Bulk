import { Injectable } from '@nestjs/common';
import { Admin } from './admin.model';

@Injectable()
export class AdminService {
  async findAll(): Promise<Partial<Admin>[]> {
    const admins = await Admin.findAll({
      attributes: ['id', 'username', 'email', 'createdAt'],
    });
    return admins;
  }
}
