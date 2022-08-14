import { DataSource } from "typeorm"
import { Item } from "./entities/item.entity"
import { User } from "./entities/user.entity";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    // [__dirname + '/entities/*.entity.js']
    entities: [Item, User], // どのエンティティ情報を読み込むのかの設定基本的にコンパイル済みのファイルを使う
    migrations: ['src/migrations/*.ts'], // どのファイルでマイグレーションを行うか
})

AppDataSource.initialize()
  .then(async (ds) => {
    console.log("datasource is initialized!!");
    // データベースアクセス処理を記述
    // ....
  })
  .catch((error) => {
    console.log(error);
  });