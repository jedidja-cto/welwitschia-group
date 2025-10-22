import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle 
          title="About Welwitschia Group" 
          subtitle="Empowering African businesses with data-driven solutions"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div>
            <h3 className="text-2xl font-semibold text-wg-dark mb-4">Our Story</h3>
            <p className="text-gray-700 mb-4">
              Welwitschia Group was founded with a vision to empower Namibian and African SMEs with the tools, 
              insights, and capital they need to thrive in an increasingly competitive global marketplace.
            </p>
            <p className="text-gray-700 mb-4">
              Named after the resilient Welwitschia plant native to the Namib Desert, our company embodies the 
              same resilience, longevity, and adaptability that characterizes this remarkable plant.
            </p>
            <p className="text-gray-700">
              Today, we serve businesses across various industries, providing comprehensive data services, 
              strategic advisory, and capital solutions tailored to the unique challenges and opportunities 
              of the African market.
            </p>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-wg-dark mb-4">Our Mission</h3>
            <p className="text-gray-700 mb-6">
              To accelerate the growth and success of African SMEs through innovative data, advisory, 
              and capital solutions that drive sustainable business outcomes.
            </p>
            
            <h3 className="text-2xl font-semibold text-wg-dark mb-4">Our Vision</h3>
            <p className="text-gray-700">
              To be the leading platform powering the next generation of African business success stories, 
              contributing to economic development and prosperity across the continent.
            </p>
          </div>
        </div>
        
        <div className="mt-16">
          <SectionTitle 
            title="Our Values" 
            subtitle="The principles that guide our work"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <Card variant="elevated" className="text-center">
              <div className="w-16 h-16 bg-wg-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-wg-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-gray-600">
                We uphold the highest standards of honesty, transparency, and ethical conduct in all our interactions.
              </p>
            </Card>
            
            <Card variant="elevated" className="text-center">
              <div className="w-16 h-16 bg-wg-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-wg-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously seek new and better ways to solve problems and create value for our clients.
              </p>
            </Card>
            
            <Card variant="elevated" className="text-center">
              <div className="w-16 h-16 bg-wg-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-wg-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-gray-600">
                We believe in the power of partnership and work closely with our clients to achieve shared goals.
              </p>
            </Card>
          </div>
        </div>
        
        <div className="mt-16">
          <SectionTitle 
            title="Leadership Team" 
            subtitle="Meet the experts behind Welwitschia Group"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Placeholder for team members */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold">Team Member {i}</h3>
                <p className="text-wg-green">Position Title</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}