import Image from 'next/image';
import Link from 'next/link';

const CastsCard = ({
  member,
  numberOrder,
}: {
  member: any;
  numberOrder: boolean;
}) => {
  return (
    <Link href={`/person/${member.id}`} key={member.id}>
      <div className="group relative aspect-[2/3] transition-transform duration-300 hover:-translate-y-2">
        {/* Image Container */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-xl">
          {member.profile_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
              alt={member.name}
              width={500}
              height={750}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500 to-purple-600">
              <span className="text-2xl font-bold uppercase text-white">
                {member.name
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')}
              </span>
            </div>
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
        </div>

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col justify-end space-y-1 p-4">
          <h3 className="truncate font-semibold text-white drop-shadow-lg">
            {member.name}
          </h3>
          <p className="truncate text-sm font-medium text-cyan-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {member.character}
          </p>
          {numberOrder && (
            <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-bold text-cyan-400 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              {member.order + 1}
            </div>
          )}
        </div>

        {/* Hover Border Effect */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 group-hover:border-cyan-400/30" />
      </div>
    </Link>
  );
};

export default CastsCard;
