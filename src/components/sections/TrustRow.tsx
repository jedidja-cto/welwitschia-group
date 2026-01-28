import { getFeaturedPartners } from '@/lib/partnerData';

export default function TrustRow() {
  const partners = getFeaturedPartners();

  // Only render the section if there are actual partners to display
  // For now, using placeholders as requested by the user
  const displayPartners = [
    { id: '1', name: 'Mavedo Communications', logoUrl: '/mavedo_communications_logo.svg', websiteUrl: '#' },
    { id: '2', name: 'Otamanzi Security', logoUrl: '/otamanzi_security_logo.svg', websiteUrl: '#' }
  ];

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center">
          <h3 className="text-xl font-serif">Trusted by</h3>
          <div className="mt-2 h-px w-12 bg-brand-red mx-auto"></div>
        </div>
        <div className="mt-8 flex justify-center gap-12 items-center">
          {displayPartners.map((partner) => (
            <div key={partner.id} className="h-20 w-48 rounded-lg flex items-center justify-center overflow-hidden">
              <div className="w-full h-full flex items-center justify-center p-2 bg-gray-50 rounded">
                <span className="text-gray-400 font-medium">{partner.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
