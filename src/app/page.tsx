import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-wg-dark text-white py-24 md:py-32 overflow-hidden">
        {/* Abstract SVG Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E67E22" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-wg-green/20 to-wg-dark/10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
                Powering African <span className="text-wg-green">SME Growth</span>
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-xl">
                Data, advisory, and capital workflows for Namibian and African SMEs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/contact" size="lg">Get Started</Button>
                <Button href="/divisions" variant="outline" size="lg">Our Services</Button>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <div className="bg-gradient-to-br from-wg-green/10 to-wg-orange/5 p-6 md:p-8 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-[1.02]">
                {/* Placeholder for hero image */}
                <div className="aspect-video bg-wg-dark/30 rounded-xl flex items-center justify-center border border-white/10">
                  <span className="text-lg font-medium">Hero Image</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divisions Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Our Divisions" 
            subtitle="Comprehensive solutions for your business needs"
            align="center"
            withAccent={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <Card variant="elevated" className="text-center md:text-left" withHover={true}>
              <div className="w-16 h-16 bg-wg-green/20 rounded-full flex items-center justify-center mb-6 md:ml-0 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-wg-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-3">Data Services</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive data collection, analysis, and visualization services to drive informed decision-making.
              </p>
              <Button href="/divisions/data-services" variant="outline">Learn More</Button>
            </Card>
            
            <Card variant="elevated" className="text-center md:text-left" withHover={true}>
              <div className="w-16 h-16 bg-wg-green/20 rounded-full flex items-center justify-center mb-6 md:ml-0 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-wg-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-3">Advisory</h3>
              <p className="text-gray-600 mb-6">
                Strategic consulting and advisory services to help your business navigate challenges and seize opportunities.
              </p>
              <Button href="/divisions/advisory" variant="outline">Learn More</Button>
            </Card>
            
            <Card variant="elevated" className="text-center md:text-left" withHover={true}>
              <div className="w-16 h-16 bg-wg-green/20 rounded-full flex items-center justify-center mb-6 md:ml-0 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-wg-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-3">Capital</h3>
              <p className="text-gray-600 mb-6">
                Financing solutions and capital raising services to fuel your business growth and expansion.
              </p>
              <Button href="/divisions/capital" variant="outline">Learn More</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Industries We Serve" 
            subtitle="Specialized expertise across key sectors"
            align="center"
            withAccent={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <Card className="border-l-4 border-wg-green" withHover={true}>
              <h3 className="text-lg md:text-xl font-medium mb-3">Hospitality</h3>
              <p className="text-gray-600">
                Currently active. Supporting hotels, restaurants, and tourism businesses.
              </p>
            </Card>
            
            <Card className="border-l-4 border-wg-orange" withHover={true}>
              <h3 className="text-lg md:text-xl font-medium mb-3">Entertainment</h3>
              <p className="text-gray-600">
                Coming in 2026. Solutions for media, events, and entertainment businesses.
              </p>
            </Card>
            
            <Card className="border-l-4 border-wg-dark" withHover={true}>
              <h3 className="text-lg md:text-xl font-medium mb-3">Education</h3>
              <p className="text-gray-600">
                Coming in 2027. Services for educational institutions and EdTech companies.
              </p>
            </Card>
            
            <Card className="border-l-4 border-gray-400" withHover={true}>
              <h3 className="text-lg md:text-xl font-medium mb-3">Mining</h3>
              <p className="text-gray-600">
                Coming in 2028. Solutions for mining and resource extraction companies.
              </p>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button href="/industries">View All Industries</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-wg-dark to-wg-green"></div>
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-cta" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-cta)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 text-white">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">Ready to grow your business?</h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/90">
            Partner with Welwitschia Group for comprehensive data, advisory, and capital solutions tailored to your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="secondary" size="lg">Contact Us</Button>
            <Button href="/client/login" variant="outline" size="lg">Client Login</Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}