export const Footer = () => {
  return (
    <div className="mx-auto py-4 md:py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
      <div className="mt-3 md:mt-0 md:order-1">
        <p className="text-center text-base text-gray-400">
          © {new Date().getFullYear()} CrowdFunding. All rights reserved.
        </p>
      </div>
    </div>
  );
};
