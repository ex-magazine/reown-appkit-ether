import NavbarLinkObject from '../types/NavbarLinkObject';

// Constants for working with Navbar Links
export const NavbarLinks: NavbarLinkObject[] = [
  {
    name: 'Extra Data',
    dropdown: [
      { name: 'EIP Protocols', href: '/ethereumdashboard/eip-protocols' },
      { name: 'Market Insights', href: '/ethereumdashboard/market-insights' },
      { name: 'Staking/Validators', href: '/ethereumdashboard/staking' },
      { name: 'Token Analytics', href: '/ethereumdashboard/collections' },
      { name: 'Wallet Analytics', href: '/ethereumdashboard/wallet-analytics' },
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
      { name: 'ENS', href: '/ens-lookup' },
      { name: 'ERC721 Token Lookups', href: '/ethereumdashboard/erc721-lookups' },
    ],
  },
];
