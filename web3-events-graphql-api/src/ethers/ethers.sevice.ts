import { Injectable } from "@nestjs/common";

@Injectable()
export class EthersService {
  constructor() {}

  async findEvents(
    contractAddress: string,
    eventName: string,
  ): Promise<any> {
    console.log(eventName, contractAddress);
    return [
      {
        id: 1,
        name: "Event 1",
      }
    ];
  }
}
