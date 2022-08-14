import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ItemRepository } from './item.repository';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemRepository]), AuthModule],
  controllers: [ItemsController],
  providers: [ItemsService, ItemRepository,RolesGuard]
})
export class ItemsModule { }
