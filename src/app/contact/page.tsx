"use client";

import React, { useState } from 'react';
import { PageHero } from '@/components/sections/PageHero';
import Navbar from '@/components/layout/MainNavbar';
import Footer from '@/components/layout/Footer';
import FormField from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { contactFormSchema, type ContactFormValues } from '@/lib/schemas';

export default function ContactPage() {
  const [values, setValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    company: '',
    service_interest: 'other',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setStatus('idle');

    const parsed = contactFormSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        const key = err.path[0]?.toString();
        if (key) fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus('success');
        setValues({ name: '', email: '', company: '', service_interest: 'other', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-grow">
        <PageHero
          title="Start the Dialogue"
          subtitle="Ready to engineer your business's technical leverage? Tell us about your project intent."
          variant="dark"
        />

        <div className="container-wide py-24">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2">
                <form onSubmit={onSubmit} className="premium-card bg-gray-50/30 border-none p-12 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      label="Full Name"
                      name="name"
                      placeholder="e.g. John Doe"
                      required
                      value={values.name}
                      onChange={handleChange}
                      error={errors.name}
                    />
                    <FormField
                      label="Business Email"
                      name="email"
                      type="email"
                      placeholder="e.g. john@company.com"
                      required
                      value={values.email}
                      onChange={handleChange}
                      error={errors.email}
                    />
                  </div>
                  <FormField
                    label="Organization"
                    name="company"
                    placeholder="Your company name"
                    required
                    value={values.company}
                    onChange={handleChange}
                    error={errors.company}
                  />

                  <FormField
                    label="Primary Interest"
                    name="service_interest"
                    as="select"
                    required
                    value={values.service_interest}
                    onChange={handleChange as any}
                    error={errors.service_interest}
                  >
                    <option value="data_services">Data Systems & Pipelines</option>
                    <option value="digital_products">Custom Web & Mobile Apps</option>
                    <option value="creative">Strategic Visual Design</option>
                    <option value="other">Other Technical Consulting</option>
                  </FormField>

                  <FormField
                    label="Project Intent"
                    name="message"
                    as="textarea"
                    placeholder="Describe the challenge you're looking to solve..."
                    required
                    value={values.message}
                    onChange={handleChange}
                    error={errors.message}
                  />

                  <div className="pt-4">
                    <Button type="submit" disabled={submitting} className="w-full">
                      {submitting ? 'Executing Request...' : 'Submit Intent'}
                    </Button>
                    {status === 'success' && (
                      <p className="mt-4 text-wg-green font-mono text-sm">TRANSMISSION SUCCESSFUL. WE WILL RESPOND SHORTLY.</p>
                    )}
                    {status === 'error' && (
                      <p className="mt-4 text-red-600 font-mono text-sm">TRANSMISSION ERROR. PLEASE RETRY.</p>
                    )}
                  </div>
                </form>
              </div>

              <div className="space-y-12">
                <div>
                  <h3 className="text-xs font-mono text-wg-green uppercase tracking-widest font-bold mb-4">Email</h3>
                  <p className="text-xl font-space">hello@welwitschiadata.com</p>
                </div>
                <div>
                  <h3 className="text-xs font-mono text-wg-green uppercase tracking-widest font-bold mb-4">Location</h3>
                  <p className="text-xl font-space text-brand-black/60 leading-relaxed">Remote-First • Operating out of Namibia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
