'use client';

import { CartDrawer } from "../cartDrawer/cartDrawer";
import { Footer } from "../layout/footer/footer";
import { Navbar } from "../layout/navbar/Navbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
};
