import {
  ObjectType,
  Field,
  Int,
  HideField,
  ID,
  Directive,
} from '@nestjs/graphql';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
@Directive(`@key(fields: "id")`)
export class User {
  @HideField()
  _id: ObjectId;

  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId;

  @Field(() => String)
  @Column()
  firstName: string;

  @Field(() => String)
  @Column()
  lastName: string;

  @Field(() => String)
  @Column()
  email: string;
}
