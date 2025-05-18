import { Module } from "@nestjs/common";
import { EventModel } from "./models/event.model";
import { EventService } from "./events.service";
import { EventResolver } from "./events.resolver";
// import { EthersModule } from "../ethers/ethers.module";

@Module({
  // imports: [EthersModule],
  providers: [EventService, EventResolver],
})
export class EventsModule {}
