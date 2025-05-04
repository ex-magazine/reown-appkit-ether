import { type ClassValue, clsx } from 'clsx';
import { formatDate, formatDistanceToNowStrict } from 'date-fns';
import { twMerge } from 'tailwind-merge';



import type { Abi } from 'viem';
import BigNumber from 'bignumber.js';

export const shortenAddress = (account: string) =>
  `${account.substring(0, 10)}...${account.substring(32)}`;

export const replacer = (key: string, value: unknown) =>
  typeof value === 'bigint' ? value.toString() : value;



export function parseAbiFileToJSON(file: File) {
  return new Promise((resolve: (value: Abi) => void, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(
          event?.target?.result?.toString() ?? '{ abi:[] }',
        ) as { abi: Abi };

        const { abi } = jsonData;
        resolve(abi);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}

export const separateFunctionInput = (
  formattedName: string,
): [string, number] => {
  const [, functionName, argumentLength] =
    formattedName.match(/^([a-zA-Z]+)\[(\d+)]$/) ?? [];

  if (functionName === '' || Number.isNaN(+argumentLength)) {
    throw new Error(
      'invalid arguments, formattedName must be formatted string.',
    );
  }

  return [functionName, +argumentLength];
};

export const convertToAbiTypedValue = (value: string, type: string) => {
  if (/^u?int\d*(\[])*$/.test(type)) {
    if (/\[]$/.test(type)) {
      const valueArray = value.replace(/\s+/g, '').split(',');
      if (valueArray.every((item) => /^-?\d+$/.test(item))) {
        return valueArray.map(BigInt);
      }
      return [];
    }

    if (/^-?\d+$/.test(value)) {
      return BigInt(value);
    }
  }
  if (type === 'bool') {
    return value.toLowerCase() === 'true';
  }
  if (/\[]$/.test(type)) {
    return value.replace(/\s+/g, '').split(',');
  }

  return value;
};

export const convertUnits = (value: string, decimals: number) =>
  new BigNumber(10)
    .pow(-decimals)
    .multipliedBy(value)
    .toFixed(100)
    .replace(/\.?0+$/, '');

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeDate(from: Date) {
  const currentDate = new Date();
  if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(from, { addSuffix: true });
  } else {
    if (currentDate.getFullYear() === from.getFullYear()) {
      return formatDate(from, 'MMM d');
    } else {
      return formatDate(from, 'MMM d, yyyy');
    }
  }
}

export function formatNumber(n: number): string {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(n);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
