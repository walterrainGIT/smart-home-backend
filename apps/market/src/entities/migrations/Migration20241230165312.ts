import { Migration } from '@mikro-orm/migrations';

export class Migration20241230165312 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create schema if not exists "market";`);
    this.addSql(`create table "market"."lots" ("id" serial, "created_at" timestamptz null, "updated_at" timestamptz null, "name" varchar(255) not null, "short_description" varchar(255) not null, "description" varchar(255) not null, "price" int not null, "image" varchar(255) not null, constraint "lots_pkey" primary key ("id"));`);

    this.addSql(`create table "market"."products" ("id" serial, "created_at" timestamptz null, "updated_at" timestamptz null, "name" varchar(255) not null, "short_description" varchar(255) not null, "description" varchar(255) not null, "price" int not null, "image" varchar(255) not null, constraint "products_pkey" primary key ("id"));`);

    this.addSql(`create table "market"."products_lots" ("product_id" serial not null, "lot_id" serial not null, constraint "products_lots_pkey" primary key ("product_id", "lot_id"));`);

    this.addSql(`alter table "market"."products_lots" add constraint "products_lots_product_id_foreign" foreign key ("product_id") references "market"."products" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "market"."products_lots" add constraint "products_lots_lot_id_foreign" foreign key ("lot_id") references "market"."lots" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "market"."products_lots" drop constraint "products_lots_lot_id_foreign";`);

    this.addSql(`alter table "market"."products_lots" drop constraint "products_lots_product_id_foreign";`);

    this.addSql(`drop table if exists "market"."lots" cascade;`);

    this.addSql(`drop table if exists "market"."products" cascade;`);

    this.addSql(`drop table if exists "market"."products_lots" cascade;`);

    this.addSql(`drop schema if exists "market";`);
  }

}
