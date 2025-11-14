const SkeletonLoader = ({ className = '', variant = 'default' }) => {
  const variants = {
    default: 'h-4 bg-gray-200 rounded',
    card: 'h-64 bg-gray-200 rounded-lg',
    circle: 'w-12 h-12 bg-gray-200 rounded-full',
    text: 'h-4 bg-gray-200 rounded w-3/4',
    title: 'h-8 bg-gray-200 rounded w-1/2',
    button: 'h-10 bg-gray-200 rounded-lg w-32'
  };

  return (
    <div className={`animate-pulse ${variants[variant]} ${className}`} />
  );
};

export const CarCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <SkeletonLoader variant="card" className="h-48" />
    <div className="p-4 space-y-3">
      <SkeletonLoader variant="title" />
      <SkeletonLoader variant="text" />
      <div className="flex justify-between items-center pt-2">
        <SkeletonLoader className="w-24" />
        <SkeletonLoader variant="button" className="w-20" />
      </div>
    </div>
  </div>
);

export const ListingSkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex gap-6">
      <SkeletonLoader className="w-48 h-36 rounded-full" />
      <div className="flex-1 space-y-3">
        <SkeletonLoader variant="title" />
        <SkeletonLoader variant="text" />
        <div className="grid grid-cols-4 gap-4 pt-2">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonLoader;
