'use client';
    import { useSearchParams } from 'next/navigation';

    const tabs = ['details', 'reviews', 'related'];

    export default function Tabs() {
      const searchParams = useSearchParams();
    //   const router = useRouter();
      const activeTab = searchParams.get('tab') || 'details';

      const handleTabChange = (tab: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('tab', tab);
        // router.push(`?${params.toString()}`, { scroll: false });
      };

      return (
        <div>
          <ul>
            {tabs.map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => handleTabChange(tab)}
                  className={activeTab === tab ? 'active' : ''}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
          {activeTab === 'details' && <div>Details Content</div>}
          {activeTab === 'reviews' && <div>Reviews Content</div>}
          {activeTab === 'related' && <div>Related Content</div>}
        </div>
      );
    }