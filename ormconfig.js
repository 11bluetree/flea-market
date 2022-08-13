module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    autoLoadEntities: true,
    entites: ['dist/entityes/*.entity.js'], // どのエンティティ情報を読み込むのかの設定基本的にコンパイル済みのファイルを使う
    migrations: ['dist/migrations/*.js'], // どのファイルでマイグレーションを行うか
    cli: { // cliで作成したファイルの出力先
        ententitiesDir: 'src/entities',
        migrationsDir: 'src/migrations',
    },
}