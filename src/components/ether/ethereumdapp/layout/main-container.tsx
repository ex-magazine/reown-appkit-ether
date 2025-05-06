import { type ReactNode } from 'react';

import { cn } from '@/lib/ether/utils';

type Props = {
  children: ReactNode;
};

const MainContainer = ({ children }: Props) => (
  <>
    <section
      className={cn(
        'flex flex-col max-w-[100rem] min-h-[calc(100vh-3.5rem-10rem)] mx-auto my-0 px-6',
        'sm:min-h-[calc(100vh-3.5rem-8rem)]',
      )}
    >
      {children}
    </section>
  </>
);

export default MainContainer;
