'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  // States for mobile and desktop menus
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({
    divisions: false,
    industries: false,
  });
  const [divisionsOpen, setDivisionsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);

  // Refs for click outside detection
  const divisionsRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);

  // Toggle functions
  const toggleDivisions = () => {
    setDivisionsOpen(!divisionsOpen);
    if (industriesOpen) setIndustriesOpen(false);
  };

  const toggleIndustries = () => {
    setIndustriesOpen(!industriesOpen);
    if (divisionsOpen) setDivisionsOpen(false);
  };

  // Click outside and keyboard handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        divisionsRef.current && 
        !divisionsRef.current.contains(event.target as Node) &&
        industriesRef.current && 
        !industriesRef.current.contains(event.target as Node)
      ) {
        setDivisionsOpen(false);
        setIndustriesOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDivisionsOpen(false);
        setIndustriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Mobile menu toggles
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleMobileSubmenu = (menu: 'divisions' | 'industries') => {
    setMobileSubmenuOpen({
      ...mobileSubmenuOpen,
      [menu]: !mobileSubmenuOpen[menu],
    });
  };

  // Menu data
  const divisionsMenu = [
    { name: 'Data Services', href: '/divisions/data-services' },
    { name: 'Advisory', href: '/divisions/advisory' },
    { name: 'Capital', href: '/divisions/capital' },
  ];

  const industriesMenu = [
    { name: 'Hospitality', href: '/industries/hospitality' },
    { name: 'Entertainment', href: '/industries/entertainment' },
    { name: 'Education', href: '/industries/education' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-wg-green">Welwitschia Group</span>
            </Link>
          </div>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center gap-x-8">
            <Link 
              href="/" 
              className="inline-flex items-center py-2 text-sm font-medium text-gray-800 hover:text-wg-green transition-colors duration-200 ease-out relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-wg-green transition-all duration-200 ease-out group-hover:w-full"></span>
            </Link>
            
            {/* Divisions Dropdown */}
            <div className="relative" ref={divisionsRef}>
              <button
                onClick={toggleDivisions}
                className="inline-flex items-center py-2 text-sm font-medium text-gray-800 hover:text-wg-green transition-colors duration-200 ease-out relative group"
                aria-expanded={divisionsOpen}
                aria-haspopup="true"
              >
                Divisions
                <svg
                  className={`ml-1.5 h-4 w-4 transition-transform duration-200 ease-out ${divisionsOpen ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-wg-green transition-all duration-200 ease-out group-hover:w-full"></span>
              </button>
              
              <div 
                className={`${
                  divisionsOpen 
                    ? 'absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50 transition-all duration-200 ease-out opacity-100 transform-gpu translate-y-0' 
                    : 'absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50 transition-all duration-200 ease-out opacity-0 transform-gpu -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="py-2 rounded-xl overflow-hidden">
                  {divisionsMenu.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-wg-green transition-colors duration-200 ease-out"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Industries Dropdown */}
            <div className="relative" ref={industriesRef}>
              <button
                onClick={toggleIndustries}
                className="inline-flex items-center py-2 text-sm font-medium text-gray-800 hover:text-wg-green transition-colors duration-200 ease-out relative group"
                aria-expanded={industriesOpen}
                aria-haspopup="true"
              >
                Industries
                <svg
                  className={`ml-1.5 h-4 w-4 transition-transform duration-200 ease-out ${industriesOpen ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-wg-green transition-all duration-200 ease-out group-hover:w-full"></span>
              </button>
              
              <div 
                className={`${
                  industriesOpen 
                    ? 'absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50 transition-all duration-200 ease-out opacity-100 transform-gpu translate-y-0' 
                    : 'absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50 transition-all duration-200 ease-out opacity-0 transform-gpu -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="py-2 rounded-xl overflow-hidden">
                  {industriesMenu.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-wg-green transition-colors duration-200 ease-out"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link href="/insights" className="inline-flex items-center py-2 text-sm font-medium text-gray-800 hover:text-[#1A8452]">
              Insights
            </Link>
            
            <Link href="/careers" className="inline-flex items-center py-2 text-sm font-medium text-gray-800 hover:text-[#1A8452]">
              Careers
            </Link>
            
            <Link href="/contact" className="inline-flex items-center py-2 text-sm font-medium text-gray-800 hover:text-[#1A8452]">
              Contact
            </Link>
          </div>
          
          {/* Client Portal Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/client"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#1A8452] hover:bg-[#114C32] transition-colors"
            >
              Client Portal
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#114C32] hover:text-[#1A8452] hover:bg-gray-50 transition-colors"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden border-t border-gray-200`}>
        <div className="pt-2 pb-3 space-y-1 px-4">
          <Link
            href="/"
            className="block py-2 text-base font-medium text-gray-800 hover:text-[#1A8452]"
          >
            Home
          </Link>
          
          {/* Mobile Divisions submenu */}
          <div className="border-b border-gray-100 pb-1">
            <button
              onClick={() => toggleMobileSubmenu('divisions')}
              className="w-full flex justify-between items-center py-2 text-base font-medium text-gray-800 hover:text-[#1A8452]"
            >
              Divisions
              <svg
                className={`ml-1 h-4 w-4 transition-transform ${mobileSubmenuOpen.divisions ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {mobileSubmenuOpen.divisions && (
              <div className="mt-1 pl-4 space-y-1">
                {divisionsMenu.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block py-2 text-sm text-gray-700 hover:text-[#1A8452]"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Mobile Industries submenu */}
          <div className="border-b border-gray-100 pb-1">
            <button
              onClick={() => toggleMobileSubmenu('industries')}
              className="w-full flex justify-between items-center py-2 text-base font-medium text-gray-800 hover:text-[#1A8452]"
            >
              Industries
              <svg
                className={`ml-1 h-4 w-4 transition-transform ${mobileSubmenuOpen.industries ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {mobileSubmenuOpen.industries && (
              <div className="mt-1 pl-4 space-y-1">
                {industriesMenu.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block py-2 text-sm text-gray-700 hover:text-[#1A8452]"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <Link
            href="/insights"
            className="block py-2 text-base font-medium text-gray-800 hover:text-[#1A8452]"
          >
            Insights
          </Link>
          
          <Link
            href="/careers"
            className="block py-2 text-base font-medium text-gray-800 hover:text-[#1A8452]"
          >
            Careers
          </Link>
          
          <Link
            href="/contact"
            className="block py-2 text-base font-medium text-gray-800 hover:text-[#1A8452]"
          >
            Contact
          </Link>
          
          <Link
            href="/client"
            className="mt-3 block w-full text-center px-4 py-2 rounded-md bg-[#1A8452] text-white font-medium hover:bg-[#114C32] transition-colors"
          >
            Client Portal
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;