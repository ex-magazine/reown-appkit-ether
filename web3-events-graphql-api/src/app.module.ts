import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { DirectiveLocation, GraphQLDirective } from "graphql";
import { EthersModule } from "./ethers/ethers.module";
import { EventsModule } from "./events/events.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      // transformSchema: schema => upperDirectiveTransformer(schema, "upper"),
      installSubscriptionHandlers: true,
      playground: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: "upper",
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
    // EthersModule.forRootAsync({
    //   providers: [ConfigService],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     network: configService.get<string>("NETWORK"),
    //     pocket: "",
    //     useDefaultProvider: false,
    //   }),
    // }),
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
