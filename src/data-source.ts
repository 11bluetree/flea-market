import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: ['src/entity/*.entity.ts'], // どのエンティティ情報を読み込むのかの設定基本的にコンパイル済みのファイルを使う
    migrations: ['src/migrations/*.ts'], // どのファイルでマイグレーションを行うか
})