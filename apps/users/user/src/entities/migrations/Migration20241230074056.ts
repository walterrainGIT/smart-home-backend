import { Migration } from '@mikro-orm/migrations';

export class Migration20241230074056 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create schema if not exists "users";`);
    this.addSql(`create table "users"."user" ("id" text not null, "created_at" timestamptz null, "updated_at" timestamptz null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(255) not null, "address" varchar(255) not null, "username" varchar(255) not null, "password_hash" varchar(255) not null, "role" varchar(255) not null, constraint "user_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "users"."user" cascade;`);

    this.addSql(`drop schema if exists "users";`);
  }

}
