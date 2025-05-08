import {
  Home,
  Library,
  Search,
  ListMusicIcon,
  TvIcon,
  Heart,
} from 'lucide-react';

const NavLinks = [
  {
    name: 'Home',
    href: '/moviesprix/home',
    icons: Home,
  },
  {
    name: 'Search',
    href: '/moviesprix/search',
    icons: Search,
  },
  {
    name: 'Movies',
    href: '/moviesprix/movies',
    icons: TvIcon,
  },
  {
    name: 'Favorites',
    href: '/moviesprix/favorites',
    icons: Heart,
  },
  // {
  //     name: 'Playlist',
  //     href: '/queue',
  //     icons: ListMusicIcon,
  // },
];

export default NavLinks;
