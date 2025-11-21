import { Migration } from '@mikro-orm/migrations';

export class Migration20241231125029 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create schema if not exists "users";`);
    this.addSql(`create table "users"."users" ("id" serial, "created_at" timestamptz null, "updated_at" timestamptz null, "first_name" varchar(255) not null, 
      "last_name" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(255) not null, "address" varchar(255) not null, "username" varchar(255) not null, 
      "password_hash" varchar(255) not null, "role" varchar(255) not null, "last_login" timestamptz not null, constraint "users_pkey" primary key ("id"));`);
    this.addSql(`alter table "users"."users" add constraint "users_email_unique" unique ("email");`);
    this.addSql(`alter table "users"."users" add constraint "users_phone_unique" unique ("phone");`);
    this.addSql(`alter table "users"."users" add constraint "users_username_unique" unique ("username");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "users"."users" cascade;`);

    this.addSql(`drop schema if exists "users";`);
  }

}
