import BlocksDetail from '@/components/evmexplorer/block-detail';

export default async function BlockDetailPage({
  params,
}: {
  params: { id: Number };
}) {
  const blockId = (await params).id;

  return (
    <>
      <BlocksDetail blockId={blockId} />
    </>
  );
}
