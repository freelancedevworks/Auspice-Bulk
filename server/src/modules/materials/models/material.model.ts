/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { MaterialSubcategory } from './material-subcategory.model';

@Table({
  tableName: 'materials',
})
export class Material extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  type: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @HasMany(() => MaterialSubcategory)
  subcategories: MaterialSubcategory[];
}
