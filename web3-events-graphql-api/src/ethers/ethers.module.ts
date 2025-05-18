import { Global, Module } from "@nestjs/common";
import { EthersService } from "./ethers.sevice";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [EthersService],
})
export class EthersModule {
  static forRoot() {
    return {
      module: EthersModule,
    };
  }

  static forRootAsync() {
    return {
      module: EthersModule,
    };
  }
}
