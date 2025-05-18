import { Injectable } from "@nestjs/common";
import { EventModel } from "./models/event.model";
import { ethers } from "ethers";

@Injectable()
export class EventService {
  async findEvents(
    contractAddress: string,
    eventName: string,
  ): Promise<EventModel[]> {
    // const provider = new ethers.JsonRpcProvider("http://localhost:8545");
    // provider.on("block", (blockNumber) => {

    return [
      {
        id: 1,
        name: "Event 1",
      }
    ];
  }
}
