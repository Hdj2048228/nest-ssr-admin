import { MigrationInterface, QueryRunner } from 'typeorm'

export class initDb implements MigrationInterface {
  // name = 'init1627800656560'

  async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE `payserver`.`user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(500) NOT NULL, `password` varchar(500) NOT NULL, `email` varchar(500) NOT NULL, `is_admin` int NOT NULL DEFAULT \'1\', PRIMARY KEY (`id`)) ENGINE=InnoDB')
    // await queryRunner.query('CREATE TABLE `payserver`.`admin_user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(500) NOT NULL, `password` varchar(500) NOT NULL, `email` varchar(500) NOT NULL, `is_admin` int NOT NULL DEFAULT \'1\',`create_time` date NOT NULL,`update_time` date NOT NULL,  PRIMARY KEY (`id`)) ENGINE=InnoDB')
    // await queryRunner.query('CREATE TABLE `payserver`.`merchant` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(500) NOT NULL, `formal` number NOT NULL, `create_time` date NOT NULL,`update_time` date NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB')
  }

  async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `payserver`.`user`')
    await queryRunner.query('DROP TABLE `payserver`.`admin_user`')
    await queryRunner.query('DROP TABLE `payserver`.`merchant`')
  }
}
