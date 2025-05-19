import {
  CalendarIcon,
  ClapperboardIcon,
  HeartIcon,
  HomeIcon,
  LucideIcon,
  PlayIcon,
  RadioTowerIcon,
  StarIcon,
  TelescopeIcon,
  TrendingUpIcon,
  TvIcon,
  User,
} from "lucide-react"

import { pages } from "@/config/oktaycolakoglu/pages"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Movies App",
  description:
    "Millions of movies, TV shows and people to discover. Explore now.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    github: "https://github.com/ex-magazine/reown-appkit-ether",
    next: "https://nextjs.org",
    vercel: "https://vercel.com",
    tmdb: "https://www.themoviedb.org",
    shadcn: "https://ui.shadcn.com/",
  },
  author: {
    name: "Tommy",
    web: "https://reown-appkit-ether.vercel.app",
  },
}

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  description?: string
  items?: NavItem[]
}

const home = {
  title: "Home",
  href: "/oktaycolakoglu/home",
  icon: HomeIcon,
}

const movies = {
  title: "Movies",
  href: "/oktaycolakoglu/movie",
  icon: ClapperboardIcon,
  description: pages.movie.root.description,
  items: [
    {
      title: "Discover",
      href: "/oktaycolakoglu/movie/discover",
      icon: TelescopeIcon,
      description: pages.movie.discover.description,
    },
    {
      title: "Popular",
      href: "/oktaycolakoglu/movie/popular",
      icon: HeartIcon,
      description: pages.movie.popular.description,
    },
    {
      title: "Now Playing",
      href: "/movie/now-playing",
      icon: PlayIcon,
      description: pages.movie.nowPlaying.description,
    },
    {
      title: "Upcoming",
      href: "/oktaycolakoglu/movie/upcoming",
      icon: CalendarIcon,
      description: pages.movie.upcoming.description,
    },
    {
      title: "Top Rated",
      href: "/oktaycolakoglu/movie/top-rated",
      icon: StarIcon,
      description: pages.movie.topRated.description,
    },
  ],
}

const tvShows = {
  title: "TV Shows",
  href: "/oktaycolakoglu/tv",
  icon: TvIcon,
  description: pages.tv.root.description,
  items: [
    {
      title: "Discover",
      href: "/oktaycolakoglu/tv/discover",
      icon: TelescopeIcon,
      description: pages.tv.discover.description,
    },
    {
      title: "Popular",
      href: "/oktaycolakoglu/tv/popular",
      icon: HeartIcon,
      description: pages.tv.popular.description,
    },
    {
      title: "Airing Today",
      href: "/oktaycolakoglu/tv/airing-today",
      icon: PlayIcon,
      description: pages.tv.airingToday.description,
    },
    {
      title: "On The Air",
      href: "/oktaycolakoglu/tv/on-the-air",
      icon: RadioTowerIcon,
      description: pages.tv.onTheAir.description,
    },
    {
      title: "Top Rated",
      href: "/oktaycolakoglu/tv/top-rated",
      icon: StarIcon,
      description: pages.tv.topRated.description,
    },
  ],
}

const people = {
  title: "People",
  href: "/oktaycolakoglu/people",
  icon: User,
  description: pages.people.root.description,
  items: [
    {
      title: "Popular",
      href: "/oktaycolakoglu/person/popular",
      icon: HeartIcon,
      description: pages.people.popular.description,
    },
  ],
}

const trending = {
  title: "Trending",
  icon: TrendingUpIcon,
  href: "/oktaycolakoglu/trending",
  description: pages.trending.root.description,
  items: [
    {
      title: "Movies",
      href: "/oktaycolakoglu/trending/movie",
      icon: ClapperboardIcon,
      description: pages.trending.movie.description,
    },
    {
      title: "TV Shows",
      href: "/oktaycolakoglu/trending/tv",
      icon: TvIcon,
      description: pages.trending.tv.description,
    },
    // {
    //   title: "People",
    //   href: "/trending/people",
    //   icon: User,
    //   description: pages.trending.people.description,
    // },
  ],
}

export const navigation = {
  items: [home, movies, tvShows, people, trending] as NavItem[],
}

export const availableParams = [
  "with_genres",
  "with_original_language",
  "with_watch_providers",
  "with_companies",
  "with_networks",
  "primary_release_date.gte",
  "primary_release_date.lte",
  "first_air_date.gte",
  "first_air_date.lte",
  "vote_average.gte",
  "vote_average.lte",
  "vote_count.gte",
  "vote_count.lte",
]

export const pageLimit = 500
