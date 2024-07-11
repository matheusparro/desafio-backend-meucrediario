import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeColumns1720296231628 implements MigrationInterface {
    name = 'ChangeColumns1720296231628';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD "date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD "date" character varying NOT NULL`);
    }

}
