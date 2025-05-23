/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IVelodromeV2PoolCallee,
  IVelodromeV2PoolCalleeInterface,
} from "../IVelodromeV2PoolCallee";

const _abi = [
  {
    type: "function",
    name: "hook",
    inputs: [
      {
        name: "sender",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount0",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "amount1",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export class IVelodromeV2PoolCallee__factory {
  static readonly abi = _abi;
  static createInterface(): IVelodromeV2PoolCalleeInterface {
    return new utils.Interface(_abi) as IVelodromeV2PoolCalleeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IVelodromeV2PoolCallee {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IVelodromeV2PoolCallee;
  }
}
