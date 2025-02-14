import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { Material } from './material.model';

@Table({
  tableName: 'material_subcategories',
})
export class MaterialSubcategory extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Material)
  @Column(DataType.UUID)
  materialId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @BelongsTo(() => Material)
  material: Material;
}
