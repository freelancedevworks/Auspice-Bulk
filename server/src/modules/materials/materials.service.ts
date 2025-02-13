import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Material } from './models/material.model';
import { MaterialSubcategory } from './models/material-subcategory.model';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectModel(Material)
    private materialModel: typeof Material,
  ) {}

  async findAll(): Promise<Material[]> {
    return this.materialModel.findAll({
      include: [MaterialSubcategory],
    });
  }
}
