import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { MaterialsService } from './materials.service';
import { Material } from './models/material.model';
import { MaterialSubcategory } from './models/material-subcategory.model';
import { MaterialsController } from './materials.controller';

@Module({
  imports: [SequelizeModule.forFeature([Material, MaterialSubcategory])],
  controllers: [MaterialsController],
  providers: [MaterialsService],
})
export class MaterialsModule {}
