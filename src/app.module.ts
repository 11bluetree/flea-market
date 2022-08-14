import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';

import { Item } from "./entities/item.entity"
import { User } from "./entities/user.rntity";

@Module({
  imports: [AuthModule,ItemsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true,
      entities: [Item, User],
    }),
    ],
})
export class AppModule { }
console.log(__dirname + '/entities/*.entity.js');
