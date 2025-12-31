export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative inline-flex">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl">💰</div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading...
          </h2>
          <p className="text-gray-600">
            Preparing your financial insights
          </p>
        </div>

        {/* Loading Skeleton for content below */}
        <div className="mt-12 max-w-2xl mx-auto px-4">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
