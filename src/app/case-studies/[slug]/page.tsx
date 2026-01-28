import React from 'react';
import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/lib/projectData';
import { PageHero } from '@/components/sections/PageHero';
import Navbar from '@/components/layout/MainNavbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import {
    PuzzlePieceIcon,
    LightBulbIcon,
    ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

interface CaseStudyItemPageProps {
    params: {
        slug: string;
    };
}

export default function CaseStudyItemPage({ params }: CaseStudyItemPageProps) {
    const { slug } = params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const isClient = project.projectType === 'client';

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Navbar />
            <main id="main-content" className="flex-grow">
                <PageHero
                    title={project.title}
                    subtitle={project.description}
                    variant={isClient ? 'green' : 'dark'}
                />

                <div className="container-wide py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-16">
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <LightBulbIcon className="h-6 w-6 text-wg-orange" />
                                    <h2 className="text-2xl font-space font-medium m-0">Project Intent</h2>
                                </div>
                                <p className="text-xl text-brand-black/70 leading-relaxed">
                                    {isClient
                                        ? `This project was commissioned by ${project.clientName || 'one of our strategic partners'} to address specific operational bottlenecks and scale their digital footprint. We focused on delivering technical leverage that directly impacted their revenue goals.`
                                        : "This project was built as an internal experiment and portfolio piece to demonstrate our capabilities in identifying and solving complex business problems using modern technology stacks."
                                    }
                                </p>
                            </section>

                            <div className="aspect-video bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
                                {project.images[0]?.url ? (
                                    <img
                                        src={project.images[0].url}
                                        alt={project.images[0].alt}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-brand-black/20 font-space text-2xl p-12 text-center">
                                        Technical visualization of {project.title}
                                    </div>
                                )}
                            </div>

                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <PuzzlePieceIcon className="h-6 w-6 text-wg-green" />
                                    <h2 className="text-2xl font-space font-medium m-0">The Architecture</h2>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {project.technologies.map((tech) => (
                                        <span key={tech} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm font-mono text-brand-black/60">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar / Meta info */}
                        <div className="space-y-12">
                            <div className=" premium-card bg-gray-50/50 border-none sticky top-32">
                                <div className="mb-8">
                                    <span className="text-xs font-mono text-wg-green uppercase tracking-widest font-bold">Category</span>
                                    <p className="text-lg font-space">{project.category}</p>
                                </div>
                                <div className="mb-8">
                                    <span className="text-xs font-mono text-wg-green uppercase tracking-widest font-bold">Context</span>
                                    <p className="text-lg font-space">{isClient ? 'Official Client Work' : 'Pitching/Experiment'}</p>
                                </div>
                                {project.liveUrl && (
                                    <div className="mb-8">
                                        <Button href={project.liveUrl} variant="primary" className="w-full">
                                            Visit Live Instance <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                                <div>
                                    <span className="text-xs font-mono text-wg-green uppercase tracking-widest font-bold">Expertise Used</span>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs px-2 py-1 bg-white rounded border border-gray-100">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next Case Study / CTA */}
                <div className="bg-wg-dark py-24 text-white text-center">
                    <div className="container-wide">
                        <h2 className="text-3xl font-space mb-8">Have a similar challenge?</h2>
                        <Button href="/contact" variant="primary" className="bg-white text-wg-dark hover:bg-gray-100">
                            Discuss Strategy
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
