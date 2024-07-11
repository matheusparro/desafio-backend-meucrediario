import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeIntegerToDecimalPayment1720380942029 implements MigrationInterface {
    name = 'ChangeIntegerToDecimalPayment1720380942029';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "due_amount"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "due_amount" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "total_paid"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "total_paid" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "outstanding_principal"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "outstanding_principal" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "outstanding_principal"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "outstanding_principal" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "total_paid"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "total_paid" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "due_amount"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "due_amount" integer NOT NULL`);
    }

}
