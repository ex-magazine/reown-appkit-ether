import TransactionDetail from '@/components/evmexplorer/transactions-detail';

export default async function TransactionsDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const addressId = (await params).id;

  return (
    <>
      <TransactionDetail addressId={addressId} />
    </>
  );
}
