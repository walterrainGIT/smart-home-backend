import { Migration } from '@mikro-orm/migrations';

export class Migration20250102114723 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create schema if not exists "portfolio";`);
    this.addSql(`create table "portfolio"."customers" ("id" serial, "created_at" timestamptz null, "updated_at" timestamptz null, "name" varchar(255) not null, "description" varchar(255) not null, "logo" varchar(255) not null, constraint "customers_pkey" primary key ("id"));`);

    this.addSql(`create table "portfolio"."portfolios" ("id" serial, "created_at" timestamptz null, "updated_at" timestamptz null, "name" varchar(255) not null, "description" varchar(255) not null, "images" text[] not null, "customer_id" serial not null, constraint "portfolios_pkey" primary key ("id"));`);

    this.addSql(`alter table "portfolio"."portfolios" add constraint "portfolios_customer_id_foreign" foreign key ("customer_id") references "portfolio"."customers" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "portfolio"."portfolios" drop constraint "portfolios_customer_id_foreign";`);

    this.addSql(`drop table if exists "portfolio"."customers" cascade;`);

    this.addSql(`drop table if exists "portfolio"."portfolios" cascade;`);

    this.addSql(`drop schema if exists "portfolio";`);
  }

}
