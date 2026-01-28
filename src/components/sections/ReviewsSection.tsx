import { getFeaturedReviews } from '@/lib/reviewData';

export default function ReviewsSection() {
  const reviews = getFeaturedReviews();

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-sans text-center">Reviews</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="card">
              <div className="flex items-center mb-3">
                {review.rating && (
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating! ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}
                {review.verified && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-brand-black/80">"{review.quote}"</p>
              <div className="mt-3 text-sm text-brand-black/60">
                {review.clientTitle ? `${review.clientName}, ${review.clientTitle}` : review.clientName} • {review.companyName}
              </div>
              {review.projectType && (
                <div className="mt-1 text-xs text-brand-black/40">{review.projectType}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}