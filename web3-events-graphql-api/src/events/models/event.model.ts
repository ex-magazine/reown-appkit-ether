import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class EventModel {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;
}
