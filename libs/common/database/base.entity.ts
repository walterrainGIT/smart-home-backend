import { BigIntType, Entity, Property, Type } from '@mikro-orm/core';
import bigInt from 'big-integer';

export class NumberBigIntType extends Type {
  convertToDatabaseValue(value: any) {
    if (!value) {
      return value;
    }
    return '' + value;
  }

  convertToJSValue(value: any) {
    if (!value) {
      return value;
    }
    return parseInt(value);
  }
}

export class NativeBigIntType extends BigIntType {
  convertToDatabaseValue(value: any) {
    if (!value) {
      return value;
    }
    return '' + value;
  }

  convertToJSValue(value: any): any {
    if (!value) {
      return value;
    }

    return bigInt(value).toString();
  }
}

@Entity({ abstract: true })
export abstract class BaseEntity {
  @Property({
    type: 'timestamp',
    nullable: true,
    onCreate: () => new Date(),
  })
  createdAt: Date;

  @Property({
    type: 'timestamp',
    nullable: true,
    onUpdate: () => new Date(),
  })
  updatedAt: Date;
}
