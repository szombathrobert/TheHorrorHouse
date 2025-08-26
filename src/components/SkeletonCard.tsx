export default function SkeletonCard() {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
      <div className="h-40 bg-gray-700 rounded-md mb-4"></div>
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </div>
  )
}
