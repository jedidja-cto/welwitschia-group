'use client';

import React from 'react';
import CookieConsent from './CookieConsent';
import MainNavbar from './MainNavbar';
import Footer from './Footer';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
  <CookieConsent />
  <MainNavbar />
  <main id="main-content" className="flex-grow">{children}</main>
  <Footer />
</div>
  );
};

export default MainLayout;
