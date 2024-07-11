import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeIntegerToDecimalContract1720380750450 implements MigrationInterface {
    name = 'ChangeIntegerToDecimalContract1720380750450';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "total_value"`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD "total_value" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "down_payment"`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD "down_payment" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "financed_amount"`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD "financed_amount" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "financed_amount"`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD "financed_amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "down_payment"`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD "down_payment" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "total_value"`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD "total_value" integer NOT NULL`);
    }

}
