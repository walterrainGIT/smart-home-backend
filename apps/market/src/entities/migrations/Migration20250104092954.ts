import { Migration } from '@mikro-orm/migrations';

export class Migration20250104092954 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "market"."orders" ("id" serial, "created_at" timestamptz null, "updated_at" timestamptz null, "user_id" int not null, "status" varchar(255) not null, "lot_id" serial not null, constraint "orders_pkey" primary key ("id"));`);

    this.addSql(`alter table "market"."orders" add constraint "orders_lot_id_foreign" foreign key ("lot_id") references "market"."lots" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "market"."orders" cascade;`);
  }

}
