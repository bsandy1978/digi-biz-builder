
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import GoogleLoginButton from "@/components/ui/GoogleLoginButton";
import CardPreview from "@/components/cards/CardPreview";
import { mockCards } from "@/data/mockData";

const Index = () => {
  // Use the first mock card for the hero section preview
  const demoCard = mockCards[0];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-brand-600/5 -z-10" />
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Digital Business Cards for the Modern Professional
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto md:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Create, customize, and share your digital business cards in minutes. Connect with clients and colleagues instantly.
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Link to="/signup">
                    <Button size="lg" className="font-medium">
                      Get Started for Free
                    </Button>
                  </Link>
                  <Link to="/features">
                    <Button variant="outline" size="lg">
                      Learn More
                    </Button>
                  </Link>
                </motion.div>
              </div>
              <motion.div 
                className="flex-1 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="relative max-w-sm">
                  <div className="absolute inset-0 bg-brand-500 rounded-2xl rotate-3 opacity-10"></div>
                  <div className="absolute inset-0 bg-brand-500 rounded-2xl -rotate-2 opacity-10"></div>
                  <CardPreview card={demoCard} className="relative z-10 shadow-xl" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose us?</h2>
              <p className="text-lg text-gray-600">
                Our platform offers an easy way to create, manage, and share your professional identity.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-100 text-brand-600 mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="M15 9h3" />
                    <path d="M15 13h3" />
                    <path d="M9 15h9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Custom Designs</h3>
                <p className="text-gray-600">
                  Choose from multiple layouts, color schemes, and styles to match your personal brand.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-100 text-brand-600 mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                    <path d="M10 2c1 .5 2 2 2 5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Eco-friendly</h3>
                <p className="text-gray-600">
                  Go paperless with digital business cards that are better for the environment and always up-to-date.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-100 text-brand-600 mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure Sharing</h3>
                <p className="text-gray-600">
                  Share your card via QR code, email, text, or social media with complete control over your information.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-100 text-brand-600 mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Accessibility</h3>
                <p className="text-gray-600">
                  Your business card is accessible anywhere in the world, anytime, on any device.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-100 text-brand-600 mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Detailed Analytics</h3>
                <p className="text-gray-600">
                  Track how many times your card has been viewed and understand your networking impact.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-100 text-brand-600 mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Easy Updates</h3>
                <p className="text-gray-600">
                  Update your information anytime and instantly share the latest version with everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
              <p className="text-lg text-gray-600">
                Create and share your digital business card in just a few simple steps.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto flex items-center justify-center rounded-full bg-brand-500 text-white text-2xl font-bold mb-5">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Sign Up</h3>
                <p className="text-gray-600">
                  Create your account in seconds with your email or Google account.
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 mx-auto flex items-center justify-center rounded-full bg-brand-500 text-white text-2xl font-bold mb-5">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Design Your Card</h3>
                <p className="text-gray-600">
                  Add your information and customize the look and feel of your digital business card.
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 mx-auto flex items-center justify-center rounded-full bg-brand-500 text-white text-2xl font-bold mb-5">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Share & Connect</h3>
                <p className="text-gray-600">
                  Share your card via link, QR code, or social media and start connecting!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to upgrade your networking?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have already made the switch to digital business cards.
            </p>
            <div className="max-w-xs mx-auto space-y-4">
              <Link to="/signup" className="block">
                <Button size="lg" variant="secondary" className="w-full">
                  Create Your Free Card
                </Button>
              </Link>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-brand-500 px-2">or</span>
                </div>
              </div>
              <GoogleLoginButton className="w-full" />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
