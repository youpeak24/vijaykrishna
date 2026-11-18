import { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/navigation/Navbar';
import Footer from './components/common/Footer';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import FilmGrain from './components/cinematic/FilmGrain';
import Preloader from './components/cinematic/Preloader';
import PageTransition from './components/cinematic/PageTransition';
import ChatAssistant from './components/chatbot/ChatAssistant';
import { useSeo } from './seo/useSeo';
import { shouldShowPreloader, markPreloaderShown } from './seo/preloaderPolicy';

// Route-based code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Filmography = lazy(() => import('./pages/Filmography'));
const FilmDetail = lazy(() => import('./pages/FilmDetail'));
const Production = lazy(() => import('./pages/Production'));
const CreativeVision = lazy(() => import('./pages/CreativeVision'));
const Gallery = lazy(() => import('./pages/Gallery'));
const PressAwards = lazy(() => import('./pages/PressAwards'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

gsap.registerPlugin(ScrollTrigger);

// Cinematic route loading indicator
const RouteLoader = () => (
  <div className="min-h-screen bg-cinemaBlack flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-2 border-gold/20 border-t-gold animate-spin" />
      <span className="font-display text-xs tracking-widest text-silver uppercase">
        Loading Scene...
      </span>
    </div>
  </div>
);

function AppInner() {
  const location = useLocation();
  useSeo(location.pathname);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <PageTransition>
        <Suspense fallback={<RouteLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/filmography" element={<Filmography />} />
            <Route path="/films/:slug" element={<FilmDetail />} />
            <Route path="/production" element={<Production />} />
            <Route path="/creative-vision" element={<CreativeVision />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/press-awards" element={<PressAwards />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageTransition>
      <Footer />
      <ChatAssistant />
    </>
  );
}

function App() {
  // Preloader is a first-visit flourish only: skipped for crawlers/audits and for returning
  // visitors, so it never delays LCP for search engines or repeat users (Core Web Vitals).
  const [loading, setLoading] = useState(shouldShowPreloader);

  useEffect(() => {
    // Initialize Lenis smooth scroll with natural, responsive cubic easing
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // Smooth cubic ease-out: responsive start, constant deceleration, no sluggish drag
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      infinite: false,
    });

    (window as unknown as { __lenis: unknown }).__lenis = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      (window as unknown as { __lenis?: unknown }).__lenis = undefined;
    };
  }, []);

  const handlePreloaderComplete = () => {
    markPreloaderShown();
    setLoading(false);
  };

  return (
    <>
      <FilmGrain />
      <CustomCursor />
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <BrowserRouter>
          <AppInner />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
