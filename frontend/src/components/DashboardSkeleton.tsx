export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen px-4 py-6 md:px-6 lg:px-8 bg-gradient-to-br from-[#020c17] via-[#0a1628] to-[#020c17] animate-pulse">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex-1">
            <div className="h-10 bg-white/10 rounded-lg w-48 mb-2"></div>
            <div className="h-5 bg-white/5 rounded-lg w-64"></div>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-lg"></div>
        </div>

        {/* Profile Card Skeleton */}
        <div className="glass-card p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/10"></div>
            <div className="flex-1">
              <div className="h-6 bg-white/10 rounded-lg w-32 mb-2"></div>
              <div className="h-4 bg-white/5 rounded-lg w-48"></div>
            </div>
          </div>
        </div>

        {/* Affiliate Code Card Skeleton */}
        <div className="glass-card p-6 mb-6 text-center bg-gradient-to-br from-aiya-purple/20 to-aiya-navy/20">
          <div className="h-4 bg-white/10 rounded-lg w-40 mx-auto mb-3"></div>
          <div className="h-12 bg-white/10 rounded-lg w-64 mx-auto mb-4"></div>
          <div className="h-10 bg-white/10 rounded-lg w-40 mx-auto"></div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Stat Card 1 */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-white/10"></div>
              <div className="flex-1">
                <div className="h-4 bg-white/10 rounded-lg w-24 mb-2"></div>
                <div className="h-8 bg-white/10 rounded-lg w-16"></div>
              </div>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-white/10"></div>
              <div className="flex-1">
                <div className="h-4 bg-white/10 rounded-lg w-32 mb-2"></div>
                <div className="h-8 bg-white/10 rounded-lg w-24"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Link Card Skeleton */}
        <div className="glass-card p-6 mb-6">
          <div className="h-6 bg-white/10 rounded-lg w-40 mb-3"></div>
          <div className="flex gap-2 mb-3">
            <div className="flex-1 h-12 bg-white/5 rounded-lg"></div>
            <div className="w-12 h-12 bg-white/10 rounded-lg"></div>
          </div>
          <div className="h-12 bg-white/10 rounded-lg mb-3"></div>
          <div className="h-3 bg-white/5 rounded-lg w-48"></div>
        </div>

        {/* Footer Skeleton */}
        <div className="h-4 bg-white/5 rounded-lg w-64 mx-auto"></div>
      </div>
    </div>
  );
}
