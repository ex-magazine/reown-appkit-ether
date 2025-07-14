    // app/items/[id]/page.tsx
    'use client';
    import { useParams } from 'next/navigation';
    import Tabs from './Tabs';

    export default function ItemDetails() {
    //   const { id } = useParams();

      return (
        <div>
          <h1>Item ID: {id}</h1>
          <Tabs />
        </div>
      );
    }
// https://ariakit.org/examples/tab-next-router
    // The final URL structure will look like /items/123?tab=details or /items/123?tab=reviews.