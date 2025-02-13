import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { MaterialsModule } from './modules/materials/materials.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make config globally available
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    AdminModule,
    MaterialsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
