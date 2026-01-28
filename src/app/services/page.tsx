import React from 'react';
import { PageHero } from '@/components/sections/PageHero';
import Navbar from '@/components/layout/MainNavbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import {
  PaintBrushIcon,
  CodeBracketIcon,
  ChartBarSquareIcon,
  SparklesIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';

const services = [
  {
    title: "Web Design",
    problem: "Digital Invisibility",
    solution: "We build more than websites. We build conversion engines that solve the problem of high traffic with low intent, ensuring your first impression leads to a bottom-line impact.",
    icon: PaintBrushIcon,
    accent: "bg-green-500"
  },
  {
    title: "Custom Applications",
    problem: "Operational Friction",
    solution: "Legacy systems and manual spreadsheets create bottlenecks. We engineer custom web applications that automate your specific workflows, solving the cost of human error and lost time.",
    icon: CodeBracketIcon,
    accent: "bg-orange-500"
  },
  {
    title: "Analytics Dashboards",
    problem: "Blind Decision Making",
    solution: "Data without clarity is noise. We solve the 'information overload' problem by distilling complex business metrics into intuitive, real-time dashboards that drive action.",
    icon: ChartBarSquareIcon,
    accent: "bg-blue-500"
  },
  {
    title: "Brand Identity",
    problem: "Lack of Market Authority",
    solution: "If you don't look the part, you won't get the contract. We solve the problem of brand inconsistency, creating visual systems that command respect and trust in a competitive market.",
    icon: SparklesIcon,
    accent: "bg-purple-500"
  },
  {
    title: "Data Engineering",
    problem: "Data Fragmentation",
    solution: "Your data is scattered across platforms. We build the architecture to centralize it, solving the problem of disconnected insights and preparing your business for AI-readiness.",
    icon: CpuChipIcon,
    accent: "bg-red-500"
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-grow">
        <PageHero
          title="Engineering Solutions, Not Just Software"
          subtitle="We focus on the underlying business challenges that hold growth back. Our services are the tools we use to solve them."
          variant="green"
        />

        <div className="container-wide py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div key={index} className="premium-card group hover:border-wg-green/50">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-3 rounded-2xl ${service.accent} bg-opacity-10 text-brand-black`}>
                    <service.icon className="h-8 w-8 text-current" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-space font-medium m-0">{service.title}</h2>
                    <span className="text-xs font-mono text-wg-orange uppercase tracking-widest italic font-bold">Solving: {service.problem}</span>
                  </div>
                </div>

                <p className="text-xl text-brand-black/70 leading-relaxed mb-8">
                  {service.solution}
                </p>

                <div className="flex items-center text-sm font-mono text-wg-green font-bold group-hover:translate-x-2 transition-transform">
                  View Case Studies <span className="ml-2">→</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-space mb-8">Ready to eliminate your technical bottlenecks?</h2>
            <p className="text-xl text-brand-black/60 mb-12">
              Every business has a different set of challenges. We don't believe in one-size-fits-all. Let's talk about what's actually slowing you down.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Start a Conversation
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
