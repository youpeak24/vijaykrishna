import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ArrowRight, ChevronDown, X, Volume2, VolumeX } from 'lucide-react';
import { filmmaker } from '../data/filmmaker';
import { gallery } from '../data/gallery';
import { awards } from '../data/awards';
import SectionHeading from '../components/ui/SectionHeading';
import MagneticButton from '../components/ui/MagneticButton';
import PortraitSlider from '../components/ui/PortraitSlider';
import CareerTimeline from '../components/sections/CareerTimeline';
import { portraits } from '../data/portraits';

gsap.registerPlugin(ScrollTrigger);

// ─── Film Corner Markers ─────────────────────────────────────────────────────
const FrameCorners: React.FC = () => (
  <>
    <span className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-ivory/30" />
    <span className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-ivory/30" />
    <span className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-ivory/30" />
    <span className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-ivory/30" />
  </>
);

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((p) => (p + 1) % filmmaker.roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!heroRef.current || !bgRef.current) return;

    // Parallax background
    const st = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        gsap.set(bgRef.current, { y: self.progress * 150 });
      },
    });

    // Entrance animation
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );

    return () => {
      st.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-cinemaBlack"
    >
      {/* Background with animated gradient */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(139,92,246,0.15) 0%, transparent 50%), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(255,48,79,0.08) 0%, transparent 50%), linear-gradient(180deg, #08080B 0%, #111116 50%, #08080B 100%)',
        }}
      />

      {/* Animated geometric overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,240,232,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Film numbering */}
      <div className="absolute top-24 right-8 md:right-20 flex items-center gap-3 opacity-30">
        <span className="font-display text-xs tracking-widest text-silver">01</span>
        <span className="w-12 h-px bg-silver" />
        <span className="font-display text-xs tracking-widest text-silver">HOME</span>
      </div>

      <FrameCorners />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 container-wide pt-28 pb-20 opacity-0">
        {/* Eyebrow */}
        <p className="eyebrow mb-8 text-silver/60">
          INDIAN CINEMA&nbsp;&nbsp;•&nbsp;&nbsp;STORIES WITHOUT LIMITS
        </p>

        {/* Main name */}
        <h1 className="font-display text-[70px] sm:text-[90px] md:text-[130px] lg:text-[160px] xl:text-[200px] leading-none tracking-tight mb-8 md:mb-12">
          <span className="block overflow-hidden mb-4 text-ivory">S VIJAY</span>
          <span className="block overflow-hidden">
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(245,240,232,0.4)' }}>
              KRISHNAN
            </span>
          </span>
          <span className="sr-only"> — Tamil Film Director &amp; Producer based in Chennai, India</span>
        </h1>

        {/* Roles */}
        <div ref={rolesRef} className="flex flex-wrap gap-4 mb-8">
          {filmmaker.roles.map((role, i) => (
            <span
              key={role}
              className={`font-body text-sm font-semibold tracking-[0.3em] uppercase transition-colors duration-500 ${
                i === currentRole ? 'text-gold' : 'text-silver/40'
              }`}
            >
              {role}{i < filmmaker.roles.length - 1 && <span className="ml-4 text-silver/20">·</span>}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p className="font-caption italic text-silver text-xl md:text-2xl mb-10 max-w-lg">
          "{filmmaker.tagline}"
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <MagneticButton href="/filmography" variant="primary" data-cursor="EXPLORE">
            View Filmography
            <ArrowRight size={16} />
          </MagneticButton>
          <MagneticButton href="/contact" variant="secondary" data-cursor="CONNECT">
            Let's Collaborate
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-silver">Scroll</span>
        <ChevronDown size={16} className="text-silver animate-bounce" />
      </div>
    </section>
  );
};

// ─── Vision Section ───────────────────────────────────────────────────────────
const VisionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="section-padding bg-charcoal overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Large display text */}
          <div>
            <p className="eyebrow mb-6 text-crimson">OUR VISION</p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none text-ivory mb-6">
              NOT JUST<br />FILMS.
            </h2>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none">
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(233,185,110,0.6)' }}>
                UNFORGETTABLE
              </span>
            </h2>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none text-ivory mt-2">
              EXPERIENCES.
            </h2>
          </div>

          {/* Right: Text + CTA */}
          <div className="lg:pt-24">
            <p className="body-text text-lg md:text-xl mb-8 leading-relaxed">
              Every project begins with a question: what does this story demand from its audience? The answer shapes everything — the visual language, the pacing, the moments of silence and eruption.
            </p>
            <p className="body-text mb-10">
              From intimate character studies to sweeping epics, the commitment remains constant: to create cinema that resonates long after the credits roll.
            </p>
            <MagneticButton href="/about" variant="ghost">
              Discover the Story
              <ArrowRight size={14} />
            </MagneticButton>
          </div>
        </div>

        {/* Pull quote */}
        <div className="mt-20 md:mt-32 border-l-2 border-gold pl-8 max-w-3xl">
          <p className="font-editorial text-2xl md:text-3xl lg:text-4xl text-ivory font-light leading-relaxed italic">
            "{filmmaker.philosophy}"
          </p>
          <p className="eyebrow mt-4 text-gold">— {filmmaker.nameShort}</p>
        </div>
      </div>
    </section>
  );
};

// ─── Showreel Section ─────────────────────────────────────────────────────────
const ShowreelSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <section className="section-padding bg-graphite relative overflow-hidden">
      {/* Background Still Image */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80"
          alt="Cinematic Showreel backdrop"
          className="w-full h-full object-cover filter blur-[2px]"
        />
        <div className="absolute inset-0 bg-graphite/80" />
      </div>

      {/* Large decorative text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[200px] md:text-[300px] text-ivory whitespace-nowrap">CINEMA</span>
      </div>

      <div className="container-wide relative z-10 text-center">
        <p className="eyebrow mb-6 text-silver">THE ART OF STORYTELLING</p>
        <h2 className="font-display text-5xl md:text-7xl lg:text-9xl text-ivory mb-16">SHOWREEL</h2>

        {/* Play button */}
        <div className="flex items-center justify-center mb-16">
          <button
            onClick={() => setModalOpen(true)}
            className="group relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32"
            data-cursor="PLAY"
          >
            <div className="absolute inset-0 rounded-full border-2 border-gold/40 group-hover:border-gold transition-colors duration-500 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-4 rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors duration-300" />
            <Play size={32} className="text-gold ml-2 relative z-10" />
          </button>
        </div>

        <p className="body-text max-w-lg mx-auto">
          A curated selection of work spanning feature films, short films, and commercial productions — each frame a testament to the craft of storytelling.
        </p>
      </div>

      {/* Video Modal Player */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-cinemaBlack/95 backdrop-blur-md p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-5xl bg-cinemaBlack border border-ivory/20 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-ivory/10 bg-graphite">
              <div>
                <p className="font-display text-lg text-ivory tracking-wide">S VIJAY KRISHNAN — OFFICIAL SHOWREEL</p>
                <p className="font-body text-[10px] text-silver uppercase tracking-wider">Cinematic Retrospective</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-silver hover:text-ivory transition-colors p-1"
                aria-label="Close showreel"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
                autoPlay
                controls
                muted={isMuted}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="px-6 py-3 bg-graphite flex items-center justify-between text-xs text-silver font-body">
              <span>Shot on ARRI Alexa LF & Cooke Anamorphic Glass • 4K DCI</span>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-ivory flex items-center gap-1"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                {isMuted ? 'Unmute Audio' : 'Mute Audio'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// ─── Bio Preview Section ─────────────────────────────────────────────────────
const BioPreview: React.FC = () => {
  return (
    <section className="section-padding bg-cinemaBlack overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Portrait slideshow */}
          <div className="relative">
            {/* Large background name */}
            <div
              className="absolute -top-10 -left-6 font-display text-[80px] md:text-[120px] text-ivory/5 leading-none select-none"
              style={{ lineHeight: 1 }}
            >
              VK
            </div>

            <PortraitSlider images={portraits} caption="Director on Set" subcaption="S Vijay Krishnan • Chennai" />
          </div>

          {/* Text */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full overflow-hidden border border-gold/50 shadow-[0_0_15px_rgba(233,185,110,0.25)] bg-cinemaBlack shrink-0">
                <img
                  src="/logo/apple-touch-icon.png"
                  alt="Vijay Krishnan"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="eyebrow text-gold">THE FILMMAKER • AUTEUR CINEMA</p>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-ivory leading-none mb-8">
              S VIJAY<br />KRISHNAN
            </h2>
            <div className="w-16 h-px bg-gold mb-8" />
            <p className="body-text text-lg leading-relaxed mb-6">
              {filmmaker.bio}
            </p>
            <p className="font-caption italic text-silver text-base mb-10">
              {filmmaker.location}
            </p>
            <MagneticButton href="/about" variant="primary">
              Discover the Story
              <ArrowRight size={16} />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Expertise Section ────────────────────────────────────────────────────────
const expertise = [
  { number: '01', title: 'Narrative Direction', desc: 'Crafting character-driven stories with a distinctive visual language.' },
  { number: '02', title: 'Visual Storytelling', desc: 'Translating emotion into imagery — every frame serves the story.' },
  { number: '03', title: 'Film Production', desc: 'End-to-end production management with artistic integrity intact.' },
  { number: '04', title: 'Screenplay Writing', desc: 'From concept to script — dialogue that breathes and plot that moves.' },
  { number: '05', title: 'Casting & Collaboration', desc: 'Building ensembles that elevate the material beyond the page.' },
  { number: '06', title: 'Post-Production', desc: 'Editorial decisions that rhythm the narrative with intention.' },
  { number: '07', title: 'Festival Strategy', desc: 'Positioning films for critical acclaim and industry recognition.' },
  { number: '08', title: 'Commercial Production', desc: 'Brand stories that carry the weight of cinematic craft.' },
];

const ExpertiseSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-charcoal overflow-hidden">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Capabilities"
          heading="WHAT WE BRING TO THE SCREEN"
          className="mb-16"
          accentColor="#FF304F"
        />

        <div className="border-t border-ivory/10">
          {expertise.map((item, i) => (
            <div
              key={item.number}
              className={`group flex items-center gap-6 md:gap-10 py-5 md:py-6 border-b border-ivory/10 cursor-default transition-all duration-300 ${
                hoveredIndex === i ? 'pl-4' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                background: hoveredIndex === i ? 'rgba(255,48,79,0.04)' : 'transparent',
              }}
            >
              <span
                className="font-display text-sm text-silver/30 w-8 shrink-0 transition-colors duration-300"
                style={{ color: hoveredIndex === i ? '#FF304F' : undefined }}
              >
                {item.number}
              </span>
              <h3
                className="font-display text-2xl md:text-3xl text-ivory flex-1 transition-colors duration-300"
                style={{ color: hoveredIndex === i ? '#F5F0E8' : undefined }}
              >
                {item.title}
              </h3>
              <p
                className={`font-body text-sm text-silver max-w-xs hidden md:block transition-all duration-300 ${
                  hoveredIndex === i ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {item.desc}
              </p>
              <div
                className={`shrink-0 transition-all duration-300 ${
                  hoveredIndex === i ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}
              >
                <ArrowRight size={16} className="text-crimson" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Behind the Scenes Section ────────────────────────────────────────────────
const BehindScenes: React.FC = () => {
  const [lightbox, setLightbox] = useState<null | typeof gallery[0]>(null);
  const behindItems = gallery.filter((g) => g.category === 'behind-the-scenes' || g.category === 'on-set').slice(0, 6);

  return (
    <section className="section-padding bg-cinemaBlack overflow-hidden">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Behind the Camera"
          heading="BEHIND THE SCENES"
          className="mb-16"
          accentColor="#2DD4BF"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {behindItems.map((item, i) => {
            const heightClass = i === 0 || i === 5 ? 'h-64 md:h-96' : 'h-48 md:h-64';
            return (
              <div
                key={item.id}
                className={`${heightClass} relative overflow-hidden group cursor-pointer`}
                onClick={() => setLightbox(item)}
                data-cursor="VIEW"
              >
                <div className="absolute inset-0 bg-cinemaBlack">
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-cinemaBlack/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="font-body text-xs text-ivory tracking-widest uppercase px-3 py-1 bg-cinemaBlack/80 border border-ivory/20">View Frame</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-cinemaBlack">
                  <p className="font-body text-xs text-silver">{item.caption}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-cinemaBlack/95 backdrop-blur-md p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={lightbox.src}
              alt={lightbox.caption}
              className="w-full h-auto max-h-[80vh] object-contain border border-ivory/20"
            />
            <p className="font-body text-sm text-silver mt-3 text-center">{lightbox.caption}</p>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-silver hover:text-ivory transition-colors font-body text-xs tracking-widest uppercase"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

// ─── Recognition Section ──────────────────────────────────────────────────────
const RecognitionSection: React.FC = () => {
  const wins = awards.filter((a) => a.type === 'win').slice(0, 4);

  return (
    <section className="section-padding bg-graphite overflow-hidden">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Recognition"
          heading="AWARDS & RECOGNITION"
          align="center"
          className="mb-16"
          accentColor="#E9B96E"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wins.map((award) => (
            <div
              key={award.id}
              className="relative p-6 border border-ivory/10 hover:border-gold/40 transition-all duration-500 group"
            >
              {/* Year in background */}
              <div className="absolute -top-4 right-4 font-display text-6xl text-ivory/5 select-none group-hover:text-gold/10 transition-colors duration-500">
                {award.year}
              </div>

              <div className="relative z-10">
                <div className="w-8 h-px bg-gold mb-6" />
                <p className="font-display text-xl text-ivory mb-2">{award.title}</p>
                <p className="font-body text-xs text-gold tracking-widest uppercase mb-3">{award.project}</p>
                <p className="font-body text-xs text-silver leading-relaxed">{award.festival}</p>
                <p className="font-body text-xs text-silver/40 mt-2">{award.country} • {award.year}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <MagneticButton href="/press-awards" variant="ghost">
            View All Recognition
            <ArrowRight size={14} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

// ─── Creative Philosophy Section ──────────────────────────────────────────────
const PhilosophySection: React.FC = () => {
  const words = ['IMAGINE.', 'CREATE.', 'CAPTURE.', 'INSPIRE.'];
  const colors = ['#8B5CF6', '#FF304F', '#E9B96E', '#2DD4BF'];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((p) => (p + 1) % words.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="section-padding relative overflow-hidden flex items-center"
      style={{
        background: 'linear-gradient(180deg, #08080B 0%, #111116 50%, #08080B 100%)',
        minHeight: '70vh',
      }}
    >
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${colors[active]}10, transparent)`,
        }}
      />

      <div className="container-wide relative z-10 text-center">
        <p className="eyebrow mb-8 text-silver">Creative Philosophy</p>
        <div className="flex flex-col items-center gap-4">
          {words.map((word, i) => (
            <div
              key={word}
              className="overflow-hidden"
            >
              <span
                className="block font-display text-6xl md:text-8xl lg:text-[120px] leading-none transition-all duration-700"
                style={{
                  color: active === i ? colors[i] : 'rgba(245,240,232,0.1)',
                  transform: active === i ? 'translateY(0)' : 'translateY(10px)',
                  fontSize: active === i ? undefined : undefined,
                }}
              >
                {word}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CTA Section ──────────────────────────────────────────────────────────────
const CTASection: React.FC = () => {
  return (
    <section className="section-padding bg-cinemaBlack relative overflow-hidden">
      {/* Animated gradient */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            'conic-gradient(from 180deg at 50% 50%, #FF304F 0deg, #8B5CF6 90deg, #E9B96E 180deg, #2DD4BF 270deg, #FF304F 360deg)',
          filter: 'blur(60px)',
          transform: 'scale(1.5)',
        }}
      />

      <div className="container-wide relative z-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-gold/50 shadow-[0_0_35px_rgba(233,185,110,0.3)] bg-cinemaBlack">
            <img
              src="/logo/android-chrome-192x192.png"
              alt="Vijay Krishnan Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <p className="eyebrow mb-6 text-silver">OPEN FOR COLLABORATION</p>
        <h2 className="font-display text-5xl md:text-7xl lg:text-9xl text-ivory leading-none mb-8">
          LET'S CREATE<br />
          <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(233,185,110,0.6)' }}>
            SOMETHING
          </span>
          <br />UNFORGETTABLE.
        </h2>
        <p className="body-text max-w-lg mx-auto mb-12">
          Whether you're a production house, brand, or fellow creative — the conversation starts with a simple hello.
        </p>
        <MagneticButton href="/contact" variant="primary" className="text-sm px-10 py-5">
          Start the Conversation
          <ArrowRight size={16} />
        </MagneticButton>
      </div>
    </section>
  );
};

// ─── Full Home Page ───────────────────────────────────────────────────────────
const Home: React.FC = () => {
  return (
    <main>
      <HeroSection />
      <VisionSection />
      <ShowreelSection />
      <BioPreview />
      <CareerTimeline />
      <ExpertiseSection />
      <BehindScenes />
      <RecognitionSection />
      <PhilosophySection />
      <CTASection />
    </main>
  );
};

export default Home;
