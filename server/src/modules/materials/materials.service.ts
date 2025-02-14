/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Material } from './models/material.model';
import { MaterialSubcategory } from './models/material-subcategory.model';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectModel(Material)
    private materialModel: typeof Material,
    @InjectModel(MaterialSubcategory)
    private subcategoryModel: typeof MaterialSubcategory,
  ) {}

  async findAll(): Promise<Material[]> {
    return this.materialModel.findAll({
      include: [MaterialSubcategory],
    });
  }

  async createMaterial(materialData: any): Promise<Material> {
    return this.materialModel.create(materialData);
  }

  async updateMaterial(id: string, materialData: any): Promise<Material> {
    const material = await this.materialModel.findByPk(id);
    if (!material) {
      throw new NotFoundException('Material not found');
    }
    await material.update(materialData);
    return material;
  }

  async deleteMaterial(id: string): Promise<void> {
    const material = await this.materialModel.findByPk(id, {
      include: [MaterialSubcategory],
    });

    if (!material) {
      throw new NotFoundException('Material not found');
    }

    // Start a transaction to ensure all operations succeed or fail together
    await this.materialModel.sequelize?.transaction(async (transaction) => {
      // Delete all subcategories first
      if (material.subcategories?.length > 0) {
        await this.subcategoryModel.destroy({
          where: { materialId: id },
          transaction,
        });
      }

      // Then delete the material
      await material.destroy({ transaction });
    });
  }

  async addSubcategory(
    materialId: string,
    subcategoryData: any,
  ): Promise<MaterialSubcategory> {
    const material = await this.materialModel.findByPk(materialId);
    if (!material) {
      throw new NotFoundException('Material not found');
    }
    return this.subcategoryModel.create({
      ...subcategoryData,
      materialId,
    });
  }

  async updateSubcategory(
    materialId: string,
    subcategoryId: string,
    subcategoryData: any,
  ): Promise<MaterialSubcategory> {
    const subcategory = await this.subcategoryModel.findOne({
      where: { id: subcategoryId, materialId },
    });
    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }
    await subcategory.update(subcategoryData);
    return subcategory;
  }

  async deleteSubcategory(
    materialId: string,
    subcategoryId: string,
  ): Promise<void> {
    const subcategory = await this.subcategoryModel.findOne({
      where: { id: subcategoryId, materialId },
    });
    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }
    await subcategory.destroy();
  }
}
