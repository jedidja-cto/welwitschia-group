'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { PricingSummary } from './PricingCalculator';

interface SummaryStepProps {
  summary: PricingSummary;
  onExport?: (format: 'pdf' | 'email') => void;
}

export default function SummaryStep({ summary, onExport }: SummaryStepProps) {
  const [emailAddress, setEmailAddress] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const formatCurrency = (amount: number) => {
    return `N${amount.toLocaleString()}`;
  };

  const handleExport = async (format: 'pdf' | 'email') => {
    if (format === 'email' && !emailAddress.trim()) {
      alert('Please enter an email address');
      return;
    }

    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (format === 'pdf') {
        // In a real implementation, this would generate and download a PDF
        const summaryText = generateSummaryText();
        const blob = new Blob([summaryText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pricing-summary.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      
      setExportSuccess(true);
      onExport?.(format);
      
      // Reset success message after 3 seconds
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const generateSummaryText = () => {
    return `
WELWITSCHIA DATA - PRICING SUMMARY
==================================

Client Type: ${summary.clientType}
${summary.selectedPackage ? `Selected Package: ${summary.selectedPackage}` : ''}

ONE-TIME SERVICES
-----------------
${summary.services.map(service => 
  `${service.name} (${service.tier}): ${formatCurrency(service.price)}`
).join('\n')}

Total One-time Cost: ${formatCurrency(summary.oneTimeCost)}
${summary.clientType === 'Enterprise' ? `(Includes ${Math.round((summary.enterpriseMultiplier - 1) * 100)}% Enterprise Premium)` : ''}

MONTHLY SERVICES
----------------
${summary.monthlyServices.map(service => 
  `${service.name}: ${formatCurrency(service.price)}/month${service.required ? ' (Required)' : ''}`
).join('\n')}

Total Monthly Cost: ${formatCurrency(summary.monthlyCost)}/month

SUMMARY
-------
Total One-time Investment: ${formatCurrency(summary.oneTimeCost)}
Monthly Recurring Cost: ${formatCurrency(summary.monthlyCost)}

Generated on: ${new Date().toLocaleDateString()}

Contact Welwitschia Data for more information:
Email: info@welwitschiadata.com
Website: https://welwitschiadata.com
    `.trim();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-brand-black mb-2">Pricing Summary</h3>
        <p className="text-sm text-brand-black/70 mb-4">
          Review your customized pricing and export your quote.
        </p>
      </div>

      {/* Client Information */}
      <Card variant="outline" className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-brand-black">Client Information</h4>
          <span className={`text-xs px-2 py-1 rounded-full ${
            summary.clientType === 'Enterprise' 
              ? 'bg-purple-100 text-purple-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {summary.clientType}
          </span>
        </div>
        
        {summary.selectedPackage && (
          <div className="text-sm text-brand-black/70">
            <span className="font-medium">Selected Package:</span> {summary.selectedPackage}
          </div>
        )}
        
        {summary.clientType === 'Enterprise' && (
          <div className="mt-2 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-xs text-purple-800">
              <strong>Enterprise Premium:</strong> A {Math.round((summary.enterpriseMultiplier - 1) * 100)}% premium 
              has been applied to one-time costs to reflect enhanced service levels and priority support.
            </p>
          </div>
        )}
      </Card>

      {/* One-time Services */}
      <Card variant="outline" className="p-4">
        <h4 className="text-md font-medium text-brand-black mb-4 flex items-center">
          <svg className="w-5 h-5 text-brand-red mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          One-time Project Costs
        </h4>
        
        {summary.services.length > 0 ? (
          <div className="space-y-3">
            {summary.services.map((service, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <span className="text-sm font-medium text-brand-black">{service.name}</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-brand-black/60">{service.tier} Tier</span>
                    <span className="text-xs text-brand-black/40">•</span>
                    <span className="text-xs text-brand-black/60">{service.category}</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-brand-red">
                  {formatCurrency(service.price)}
                </span>
              </div>
            ))}
            
            <div className="border-t-2 border-brand-red pt-3 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-brand-black">
                  Total One-time Cost
                </span>
                <span className="text-lg font-bold text-brand-red">
                  {formatCurrency(summary.oneTimeCost)}
                </span>
              </div>
              {summary.clientType === 'Enterprise' && (
                <p className="text-xs text-brand-black/60 mt-1 text-right">
                  Includes {Math.round((summary.enterpriseMultiplier - 1) * 100)}% enterprise premium
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-brand-black/60 italic">No one-time services selected</p>
        )}
      </Card>

      {/* Monthly Services */}
      <Card variant="outline" className="p-4">
        <h4 className="text-md font-medium text-brand-black mb-4 flex items-center">
          <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Monthly Recurring Costs
        </h4>
        
        {summary.monthlyServices.length > 0 ? (
          <div className="space-y-3">
            {summary.monthlyServices.map((service, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-brand-black">{service.name}</span>
                  {service.required && (
                    <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      Required
                    </span>
                  )}
                </div>
                <span className="text-sm font-semibold text-green-600">
                  {formatCurrency(service.price)}/month
                </span>
              </div>
            ))}
            
            <div className="border-t-2 border-green-600 pt-3 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-brand-black">
                  Total Monthly Cost
                </span>
                <span className="text-lg font-bold text-green-600">
                  {formatCurrency(summary.monthlyCost)}/month
                </span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-brand-black/60 italic">No monthly services selected</p>
        )}
      </Card>

      {/* Cost Summary */}
      <Card variant="elevated" className="p-6 bg-gradient-to-r from-brand-red/5 to-brand-red/10">
        <h4 className="text-lg font-semibold text-brand-black mb-4 text-center">Investment Summary</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-red mb-1">
              {formatCurrency(summary.oneTimeCost)}
            </div>
            <div className="text-sm text-brand-black/70">
              One-time Investment
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {formatCurrency(summary.monthlyCost)}
            </div>
            <div className="text-sm text-brand-black/70">
              Monthly Investment
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-brand-red/20">
          <div className="text-center">
            <p className="text-sm text-brand-black/70 mb-2">
              12-Month Total Investment
            </p>
            <div className="text-xl font-bold text-brand-black">
              {formatCurrency(summary.oneTimeCost + (summary.monthlyCost * 12))}
            </div>
          </div>
        </div>
      </Card>

      {/* Export Options */}
      <Card variant="outline" className="p-4">
        <h4 className="text-md font-medium text-brand-black mb-4">Export Your Quote</h4>
        
        <div className="space-y-4">
          {/* Email Export */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-brand-black">
              Email Summary
            </label>
            <div className="flex space-x-3">
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
              />
              <Button
                onClick={() => handleExport('email')}
                disabled={isExporting || !emailAddress.trim()}
                className="whitespace-nowrap"
              >
                {isExporting ? 'Sending...' : 'Send Email'}
              </Button>
            </div>
          </div>
          
          {/* PDF Export */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div>
              <span className="text-sm font-medium text-brand-black">Download PDF</span>
              <p className="text-xs text-brand-black/60">Get a detailed PDF summary of your quote</p>
            </div>
            <Button
              variant="outline"
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
            >
              {isExporting ? 'Generating...' : 'Download PDF'}
            </Button>
          </div>
        </div>
        
        {exportSuccess && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-green-800">Export completed successfully!</span>
            </div>
          </div>
        )}
      </Card>

      {/* Call to Action */}
      <Card variant="elevated" className="p-6 text-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <h4 className="text-lg font-semibold text-brand-black mb-2">Ready to Get Started?</h4>
        <p className="text-sm text-brand-black/70 mb-4">
          Contact our team to discuss your project requirements and finalize your quote.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button className="bg-brand-red hover:bg-brand-red/90">
            Contact Sales Team
          </Button>
          <Button variant="outline">
            Schedule Consultation
          </Button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-brand-black/60">
            Questions? Email us at <a href="mailto:info@welwitschiadata.com" className="text-brand-red hover:underline">info@welwitschiadata.com</a> or call us at +264 81 123 4567
          </p>
        </div>
      </Card>
    </div>
  );
}