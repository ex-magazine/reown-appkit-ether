import Image from 'next/image';
import Link from 'next/link';

import { PageSEO } from '@/components/evmexplorer/SEO';
import { getProjects, Project } from '@/services/ProjectService';

const Explorer = () => {
  const projects: Project[] = getProjects();

  const projectListItems = projects.map((project: Project) => (
    <div
      className="project-card fade-in-cards shadow-xs rounded-sm"
      key={project.name}
    >
      <Link href={`/evmexplorer/explore/${project.name}`}>
        <Image
          width={400}
          height={400}
          src={`/${project.logoPath}`}
          alt={project.name}
        />
      </Link>
    </div>
  ));

  return (
    <>
      <PageSEO path="/evmexplorer/explorer" />
      <div className="mx-auto w-full space-y-12 text-center">
        <h1 className="text-4xl font-semibold  mt-4 sm:mt-10 px-4 fade-in-text md:tracking-wide">
          Popular EVM Sets of Contracts
        </h1>

        <div className="card-columns mt-10 px-10 md:px-20 gap-x-6 gap-y-4">
          {projectListItems}
        </div>
      </div>
    </>
  );
};

export default Explorer;
