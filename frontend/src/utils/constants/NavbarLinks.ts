import NavbarLinkObject from '../types/NavbarLinkObject';

// Constants for working with Navbar Links
export const NavbarLinks: NavbarLinkObject[] = [
  {
    name: 'Airdrop & Whitelist',
    dropdown: [
      {
        name: 'Cryptorank',
        href: 'https://cryptorank.io/drophunting',
      },
      {
        name: 'Galxe',
        href: 'https://www.galxe.com/earndrop',
      },
      {
        name: 'Zealy',
        href: 'https://zealy.io/',
      },
      {
        name: 'Layer 3',
        href: 'https://app.layer3.xyz/discover',
      },
      {
        name: 'Revoke',
        href: 'https://revoke.cash',
      },
      {
        name: 'AdsPower Browser',
        href: 'https://www.adspower.com/',
      },
      {
        name: 'Bitwarden',
        href: 'https://bitwarden.com/',
      },
      {
        name: 'DeBank',
        href: 'https://debank.com/',
      },
      {
        name: '5phutcrypto',
        href: 'https://5phutcrypto.io/cong-cu-san-airdrop-va-whitelist',
      },
    ],
  },
  {
    name: 'Extra Data',
    dropdown: [
      { name: 'EIP Protocols', href: '/ethereumdashboard/eip-protocols' },
      { name: 'Market Insights', href: '/ethereumdashboard/market-insights' },
      { name: 'Staking/Validators', href: '/ethereumdashboard/staking' },
      { name: 'Token Analytics', href: '/ethereumdashboard/collections' },
      { name: 'Wallet Analytics', href: '/ethereumdashboard/wallet-analytics' },
      { name: 'EVM Explorer', href: '/evmexplorer' },
      { name: 'EVM Popular', href: '/evmexplorer/explore' },
      { name: 'EVM Climate', href: '/evmexplorer/climate' },
    ],
  },
  {
    name: 'Gas Info',
    dropdown: [
      {
        name: 'Gas Information',
        href: '/ethereumdashboard/gas-tracker',
      },
    ],
  },
  {
    name: 'Layer Two Dashboards',
    dropdown: [
      { name: 'Arbitrum', href: 'https://arbdashboard.xyz' },
      { name: 'Optimism', href: 'https://optimismdashboard.xyz' },
      { name: 'Polygon', href: 'https://polygondashboard.xyz' },
    ],
  },
  {
    name: 'Prices',
    dropdown: [
      { name: 'Coin Prices', href: '/ethereumdashboard/prices' },
      { name: 'ERC20 Token Prices', href: '/ethereumdashboard/erc20-token-prices' },
    ],
  },
  {
    name: 'Token Holdings',
    dropdown: [
      { name: 'ERC20 Holdings', href: '/ethereumdashboard/erc20-holdings' },
      { name: 'ERC721 Holdings', href: '/ethereumdashboard/erc721-holdings' },
    ],
  },
  {
    name: 'Token Lookups',
    dropdown: [
      { name: 'ENS', href: '/ethereumdashboard/ens-lookup' },
      { name: 'ERC721 Token Lookups', href: '/ethereumdashboard/erc721-lookups' },
    ],
  },
];
