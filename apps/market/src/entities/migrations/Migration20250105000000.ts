import { Migration } from '@mikro-orm/migrations';

export class Migration20250105000000 extends Migration {
  override async up(): Promise<void> {
    this
      .addSql(`create table "market"."configurator" ("id" serial, "created_at" timestamptz null, "updated_at" timestamptz null, 
      "user_id" int not null, "rooms" jsonb not null, "total_price" int not null, "name" varchar(255) null, 
      constraint "configurator_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "market"."configurator" cascade;`);
  }
}
