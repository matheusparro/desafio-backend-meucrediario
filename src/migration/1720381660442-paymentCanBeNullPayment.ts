import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentCanBeNullPayment1720381660442 implements MigrationInterface {
    name = 'PaymentCanBeNullPayment1720381660442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "last_payment_date" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "last_payment_date" SET NOT NULL`);
    }

}
