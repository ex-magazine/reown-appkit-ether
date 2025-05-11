import Post from '@/components/evmexplorer/explore-detail';
import { getProject } from '@/services/ProjectService';

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const post = (await params).id;

  const [project] = await Promise.all([getProject(post)]);

  return (
    <>
      <Post project={project} />
    </>
  );
}
