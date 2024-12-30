import { Migration } from '@mikro-orm/migrations';

export class Migration20241230130753 extends Migration {

  override async up(): Promise<void> {
    // Добавляем колонку с значением по умолчанию
    this.addSql(`alter table "users"."user" add column "last_login" timestamptz not null default now();`);

    this.addSql(`alter table "users"."user" add constraint "user_email_unique" unique ("email");`);
    this.addSql(`alter table "users"."user" add constraint "user_phone_unique" unique ("phone");`);
    this.addSql(`alter table "users"."user" add constraint "user_username_unique" unique ("username");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "users"."user" drop constraint "user_email_unique";`);
    this.addSql(`alter table "users"."user" drop constraint "user_phone_unique";`);
    this.addSql(`alter table "users"."user" drop constraint "user_username_unique";`);
    this.addSql(`alter table "users"."user" drop column "last_login";`);
  }

}
