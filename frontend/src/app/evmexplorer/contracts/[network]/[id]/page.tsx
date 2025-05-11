import ContractsDetail from '@/components/evmexplorer/contracts-detail';

export default async function ContractDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const addressId = (await params).id;
  //   const pathname = usePathname();

  //       const parts = pathname.split('/');
  //       const network = parts[parts.length - 2];
  //       const page = parts[parts.length - 1];

  //        const networkQuery: string = String(network);
  // const path: string = "/evmexplorer/contracts/" + networkQuery + "/" + String(page);

  return (
    <>
      <ContractsDetail addressId={addressId} />
    </>
  );
}
