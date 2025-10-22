"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/ui/SectionTitle';
import FormField from '@/components/ui/FormField';
import Button from '@/components/ui/Button';
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
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle
          title="Contact Us"
          subtitle="Tell us about your business and goals"
          align="center"
        />

        <div className="max-w-2xl mx-auto mt-8">
          <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-md p-6">
            <FormField
              label="Name"
              name="name"
              placeholder="Your full name"
              required
              value={values.name}
              onChange={handleChange}
              error={errors.name}
            />

            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              value={values.email}
              onChange={handleChange}
              error={errors.email}
            />

            <FormField
              label="Company"
              name="company"
              placeholder="Your company name"
              required
              value={values.company}
              onChange={handleChange}
              error={errors.company}
            />

            <FormField
              label="Service Interest"
              name="service_interest"
              as="select"
              required
              value={values.service_interest}
              onChange={handleChange as any}
              error={errors.service_interest}
            >
              <option value="data_services">Data Services</option>
              <option value="advisory">Advisory</option>
              <option value="capital">Capital</option>
              <option value="other">Other</option>
            </FormField>

            <FormField
              label="Message"
              name="message"
              as="textarea"
              placeholder="Tell us a bit about your needs"
              required
              value={values.message}
              onChange={handleChange}
              error={errors.message}
            />

            <div className="flex items-center justify-between mt-6">
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Sending…' : 'Send Message'}
              </Button>
              {status === 'success' && (
                <span className="text-wg-green">Thanks! We’ll be in touch soon.</span>
              )}
              {status === 'error' && (
                <span className="text-red-600">Something went wrong. Please try again.</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}