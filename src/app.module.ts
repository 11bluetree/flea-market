import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [ItemsModule,
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    autoLoadEntities: true,
    entities: [__dirname + '/entities/*.entity.ts']
  })],
})
export class AppModule {}
console.log(__dirname + '/entities/*.entity.ts');
