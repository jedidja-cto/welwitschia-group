'use client';

export default function ContactCTASection() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="aspect-video w-full rounded-xl border border-gray-200 overflow-hidden relative shadow-lg">
          <img 
            src="/begin_your_project.jpg" 
            alt="Begin your project" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-serif">Begin Your Project</h2>
          <p className="mt-4 text-brand-black/70">
            Tell us about your goals. We’ll recommend a tailored bundle and timeline.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="/contact" className="btn btn-primary">Get Started</a>
            <a href="/pricing" className="btn btn-secondary">View Pricing</a>
          </div>
        </div>
      </div>
    </section>
  );
}
