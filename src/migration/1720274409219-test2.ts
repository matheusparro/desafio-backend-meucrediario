import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test21720274409219 implements MigrationInterface {
    name = 'Test21720274409219';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contracts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "document_number" character varying NOT NULL, "date" character varying NOT NULL, "total_value" integer NOT NULL, "down_payment" integer NOT NULL, "financed_amount" integer NOT NULL, CONSTRAINT "PK_2c7b8f3a7b1acdd49497d83d0fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "due_amount" integer NOT NULL, "due_date" TIMESTAMP NOT NULL, "last_payment_date" TIMESTAMP NOT NULL, "total_paid" integer NOT NULL, "outstanding_principal" integer NOT NULL, "contractId" uuid, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_f74e4083db402dfc68a6def8992" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_f74e4083db402dfc68a6def8992"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "contracts"`);
    }

}
