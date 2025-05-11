import { Contract } from 'ethers';

export type User = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: 'ADMIN' | 'SUPPORT' | 'USER';
  walletAddress: string | null;
};

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  category: 'GENERAL' | 'TECHNICAL' | 'BILLING' | 'FEATURE_REQUEST' | 'BUG';
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  assignedId: string | null;
  txHash: string | null;
  createdBy: User;
  assignedTo: User | null;
};

export type Project = {
  name: string;
  logoPath: string;
  description?: string;
  contracts: Array<Contract>;
};

export type FullContractWrapper = {
  name: string;
  abi: string;
  address: `0x${string}`;
  availableAddresses: Array<ContractData>;
  ethersContract: Contract;
};

export type ContractData = {
  address: string;
  network: string;
};
