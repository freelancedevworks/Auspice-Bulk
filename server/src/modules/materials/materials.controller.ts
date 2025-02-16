/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/materials')
export class MaterialsController {
  constructor(private materialsService: MaterialsService) {}

  @Get()
  async getAllMaterials() {
    return this.materialsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createMaterial(@Body() materialData: any) {
    return this.materialsService.createMaterial(materialData);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateMaterial(@Param('id') id: string, @Body() materialData: any) {
    return this.materialsService.updateMaterial(id, materialData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteMaterial(@Param('id') id: string) {
    return this.materialsService.deleteMaterial(id);
  }

  @Post(':materialId/subcategories')
  @UseGuards(JwtAuthGuard)
  async addSubcategory(
    @Param('materialId') materialId: string,
    @Body() subcategoryData: any,
  ) {
    return this.materialsService.addSubcategory(materialId, subcategoryData);
  }

  @Put(':materialId/subcategories/:subcategoryId')
  @UseGuards(JwtAuthGuard)
  async updateSubcategory(
    @Param('materialId') materialId: string,
    @Param('subcategoryId') subcategoryId: string,
    @Body() subcategoryData: any,
  ) {
    return this.materialsService.updateSubcategory(
      materialId,
      subcategoryId,
      subcategoryData,
    );
  }

  @Delete(':materialId/subcategories/:subcategoryId')
  @UseGuards(JwtAuthGuard)
  async deleteSubcategory(
    @Param('materialId') materialId: string,
    @Param('subcategoryId') subcategoryId: string,
  ) {
    return this.materialsService.deleteSubcategory(materialId, subcategoryId);
  }
}
