
export default function MyProfileLoading() {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-pulse">
      <div className="flex items-center space-x-6 mb-8">
        <div className="rounded-full bg-default-200 h-24 w-24" />
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-default-300 rounded-lg w-1/3" />
          <div className="h-4 bg-default-200 rounded-lg w-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-default-100 rounded-xl p-4 space-y-3">
            <div className="h-4 bg-default-200 rounded w-1/4" />
            <div className="h-4 bg-default-200 rounded w-full" />
            <div className="h-4 bg-default-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}