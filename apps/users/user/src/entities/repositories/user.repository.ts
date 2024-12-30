import {
  SqlEntityRepository,
} from '@mikro-orm/postgresql';
import { UserEntity } from 'user/entities';

export class UserRepository extends SqlEntityRepository<UserEntity> {
}
