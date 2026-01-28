import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectDescription: '',
    budgetRange: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectDescription: formData.projectDescription,
          budgetRange: formData.budgetRange,
          timestamp: new Date().toISOString()
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          projectDescription: '',
          budgetRange: ''
        });
      } else {
        throw new Error(result.error || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };
  
  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-green-800">Thank you for your message!</h3>
        <p className="mt-2 text-green-700">We'll get back to you as soon as possible.</p>
        <Button 
          variant="secondary" 
          className="mt-4"
          onClick={() => setStatus('idle')}
        >
          Send another message
        </Button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      
      <div>
        <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
          What are you trying to build? *
        </label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          rows={4}
          required
          value={formData.projectDescription}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Describe your project or what you're looking to build..."
        />
      </div>
      
      <div>
        <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 mb-1">
          Budget Range
        </label>
        <select
          id="budgetRange"
          name="budgetRange"
          value={formData.budgetRange}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Select budget range (optional)</option>
          <option value="under-5k">Under $5,000</option>
          <option value="5k-15k">$5,000 - $15,000</option>
          <option value="15k-50k">$15,000 - $50,000</option>
          <option value="50k-plus">$50,000+</option>
        </select>
      </div>
      
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          disabled={status === 'submitting'}
          className="w-full"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </Button>
        
        {status === 'error' && (
          <p className="mt-2 text-red-600 text-sm">
            There was an error submitting your message. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}