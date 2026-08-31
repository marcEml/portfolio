import Skeleton from "react-loading-skeleton";

export function SkeletonLoader({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton
          key={index}
          height={56}
          borderRadius={2}
          baseColor="#EEF1F7"
          highlightColor="#F8FAFF"
        />
      ))}
    </div>
  );
}
