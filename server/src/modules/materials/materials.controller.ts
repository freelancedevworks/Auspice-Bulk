import { Controller, Get } from '@nestjs/common';
import { MaterialsService } from './materials.service';

@Controller('api/materials')
export class MaterialsController {
  constructor(private materialsService: MaterialsService) {}

  @Get()
  async getAllMaterials() {
    return this.materialsService.findAll();
  }
}
