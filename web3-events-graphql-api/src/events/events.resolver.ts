import { NotFoundException } from "@nestjs/common";
import { Resolver, Query, Args } from "@nestjs/graphql";
import { EventService } from "./events.service";
import { EventModel } from "./models/event.model";

@Resolver((of) => EventModel)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query((returns) => [EventModel])
  async findEvents(
    @Args("contractAddress") contractAddress: string,
    @Args("eventName") eventName: string,
  ): Promise<EventModel[]> {
    const events = await this.eventService.findEvents(
      contractAddress,
      eventName,
    );
    if (!events) {
      throw new NotFoundException(contractAddress, eventName);
    }
    return events;
  }
}
