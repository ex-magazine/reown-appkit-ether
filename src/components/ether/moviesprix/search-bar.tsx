'use client';

import { Search } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
  onChange?: (e: string) => void;
};

const SearchBar = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (props.onChange) props.onChange(query);
  }, [query]);

  const handleFocus = () => {
    if (pathname !== '/moviesprix/search') router.push('/moviesprix/search');
    console.log('first');
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl gap-5">
      <form className="group mx-auto flex w-full flex-1 items-center gap-3 rounded-lg border bg-muted px-3 py-2 transition-all focus-within:border-primary">
        <Search className="size-5 text-muted-foreground group-focus-within:text-primary" />
        <input
          className="flex-1 bg-transparent font-normal outline-none"
          placeholder="What do you want to search?"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocusCapture={handleFocus}
          autoFocus={pathname === '/moviesprix/search'}
        />
      </form>
    </div>
  );
};

export default SearchBar;
