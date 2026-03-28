import { useEffect, useState } from 'react';
import './App.css';

// Components
import LiquidDistortion from './components/LiquidDistortion';

// Sections
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Products from './sections/Products';
import LiveCustomizer from './sections/LiveCustomizer';
import WhyChooseUs from './sections/WhyChooseUs';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          {/* Animated Logo */}
          <div className="relative mb-8">
            <div className="text-4xl font-bold">
              <span className="text-akd-lime animate-pulse">AKD</span>
              <span className="text-white"> Custom</span>
            </div>
            {/* Loading Bar */}
            <div className="mt-6 w-48 h-1 bg-akd-charcoal rounded-full overflow-hidden mx-auto">
              <div
                className="h-full bg-akd-lime rounded-full animate-[loading_1.5s_ease-out_forwards]"
                style={{
                  animation: 'loading 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                }}
              />
            </div>
          </div>
          <p className="text-white/40 text-sm">Loading Experience...</p>
        </div>

        <style>{`
          @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-akd-lime to-green-400 transition-all duration-100"
          style={{
            width: `${scrollProgress}%`,
            boxShadow: '0 0 10px rgba(208, 255, 89, 0.5)',
          }}
        />
      </div>

      {/* Liquid Distortion Effect */}
      <LiquidDistortion />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        <Hero />
        <About />
        <Products />
        <LiveCustomizer />
        <WhyChooseUs />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Background Grid */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(208, 255, 89, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(208, 255, 89, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Ambient Glow Effects */}
      <div className="fixed top-1/4 left-0 w-96 h-96 bg-akd-lime/5 rounded-full blur-3xl pointer-events-none z-[2]" />
      <div className="fixed bottom-1/4 right-0 w-96 h-96 bg-akd-lime/5 rounded-full blur-3xl pointer-events-none z-[2]" />
    </div>
  );
}

export default App;
