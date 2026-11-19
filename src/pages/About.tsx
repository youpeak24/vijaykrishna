import React from 'react';
import { ArrowRight, Compass, Film, Award, Heart, Sparkles } from 'lucide-react';
import { filmmaker } from '../data/filmmaker';
import SectionHeading from '../components/ui/SectionHeading';
import MagneticButton from '../components/ui/MagneticButton';

const journeyMilestones = [
  {
    year: '2012',
    title: 'THE AWAKENING',
    subtitle: 'From Film Buff to Camera Apprentice',
    description:
      'Immersed in Chennai’s legendary cinema halls and local theater groups, learning the raw rhythm of Tamil narrative theater and early celluloid projection.',
    icon: Compass,
    accent: '#8B5CF6',
  },
  {
    year: '2016',
    title: 'THE DISCIPLINE OF SHORT-FORM',
    subtitle: 'Independent Breakthrough & Film Festivals',
    description:
      'Directed seminal indie short films that toured South Asian film festivals, discovering that emotional truth requires neither star power nor massive budgets.',
    icon: Film,
    accent: '#2DD4BF',
  },
  {
    year: '2020',
    title: 'MAZHAI & CRITICAL ACCLAIM',
    subtitle: 'BIFFES Winner & National Recognition',
    description:
      'Shot on location in Ramanathapuram with a crew of twelve. Mazhai captured the prestigious BIFFES Award and proved S Vijay Krishnan’s signature poetics of space and silence.',
    icon: Award,
    accent: '#3478F6',
  },
  {
    year: '2021-2022',
    title: 'THE CANVASES EXPAND',
    subtitle: 'Ratchagan Rises & Kaadu Kuyil',
    description:
      'Directing mainstream feature canvases while maintaining uncompromising visual authorship — marrying sociopolitical grit with poetic chiaroscuro cinematography.',
    icon: Sparkles,
    accent: '#FF304F',
  },
  {
    year: '2023',
    title: 'NILAVIL ONDRU & BEST DIRECTOR',
    subtitle: 'Chennai International Film Festival Laurel',
    description:
      'Nilavil Ondru affirmed S Vijay Krishnan as one of Indian cinema’s premier contemporary auteurs, sweeping festival laurels and audience devotion.',
    icon: Award,
    accent: '#E9B96E',
  },
  {
    year: '2024-BEYOND',
    title: 'VK PRODUCTIONS & GLOBAL HORIZONS',
    subtitle: 'Vaanam Thiranthu & International Co-productions',
    description:
      'Stepping into international co-productions and empowering distinctive new cinematic voices through VK Productions while preparing his most ambitious feature.',
    icon: Heart,
    accent: '#F542A7',
  },
];

const processSteps = [
  {
    step: '01',
    phase: 'THE IDEA',
    headline: 'Incubation of Emotion',
    body: 'A film begins not with plot, but with a visceral emotional conflict or an unanswered question about the human soul. Months are spent soaking in locations and listening before writing.',
  },
  {
    step: '02',
    phase: 'THE SCRIPT',
    headline: 'Architecture of Truth',
    body: 'Every line of dialogue must sound lived-in. Characters are treated as living, contradictory beings with secrets. Action descriptions are written visually for the camera.',
  },
  {
    step: '03',
    phase: 'THE VISION',
    headline: 'Color Script & Geometry',
    body: 'Collaborating with cinematographers and production designers to build a unified visual bible: aspect ratios, lens choices, color temperatures, and textural references.',
  },
  {
    step: '04',
    phase: 'THE PRODUCTION',
    headline: 'Presence & Atmosphere',
    body: 'On set, creating a sacred, focused space where actors can be vulnerable and vulnerable moments can be seized. Directing is the art of seeing what is genuinely unfolding.',
  },
  {
    step: '05',
    phase: 'THE FINAL FRAME',
    headline: 'Rhythm, Sound & Soul',
    body: 'The film is reborn in the editing room. Pacing is calibrated to heartbeat; soundscapes and score are woven in Dolby Atmos to transport the audience beyond the screen.',
  },
];

const About: React.FC = () => {
  return (
    <>
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="min-h-[85vh] flex items-end bg-cinemaBlack relative overflow-hidden pt-28 pb-16">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 75% 30%, #E9B96E18 0%, transparent 60%), radial-gradient(circle at 20% 70%, #FF304F15 0%, transparent 60%)',
          }}
        />

        <div className="container-wide relative z-10 w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gold/40 shadow-[0_0_12px_rgba(233,185,110,0.2)] shrink-0">
              <img
                src="/logo/apple-touch-icon.png"
                alt="Vijay Krishnan"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-px bg-gold" />
              <p className="eyebrow text-gold">The Mind Behind The Frame</p>
            </div>
          </div>

          <h1 className="font-display text-[64px] sm:text-[90px] md:text-[130px] lg:text-[160px] leading-[0.88] text-ivory tracking-tight mb-8">
            BEYOND THE<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(233,185,110,0.8)' }}>
              VIEWFINDER.
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t border-ivory/10 pt-8">
            <div className="md:col-span-8">
              <p className="font-editorial text-2xl md:text-3xl text-ivory font-light italic leading-snug">
                "Every story already lives in the ether. As a filmmaker, my task is not to invent, but to listen with enough reverence that the frame reveals itself."
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <span className="font-display text-xs tracking-widest text-silver/60 uppercase">
                DIRECTOR’S ARCHIVE • EST. 2012
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Editorial Portrait & Biography ──────────────────────── */}
      <section className="section-padding bg-charcoal relative">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Visual Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] overflow-hidden border border-ivory/10 group">
                <img
                  src="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80"
                  alt="S Vijay Krishnan on film set"
                  className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinemaBlack via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="eyebrow text-gold block mb-1">Director On Set</span>
                  <p className="font-body text-xs text-silver">Baselight Color Suite • Prasad Labs, Chennai</p>
                </div>

                {/* Film frame corner markers */}
                <span className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-gold/60" />
                <span className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-gold/60" />
                <span className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-gold/60" />
                <span className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-gold/60" />
              </div>

              {/* Stats Card Overlay */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {filmmaker.stats.map((stat, idx) => (
                  <div key={idx} className="p-4 bg-graphite border border-ivory/5">
                    <p className="font-display text-3xl md:text-4xl text-gold mb-1">{stat.number}</p>
                    <p className="font-body text-xs text-silver/70 tracking-wider uppercase">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Editorial Copy */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <SectionHeading
                eyebrow="Origins & Philosophy"
                heading="STORIES WITH ROOTS, VISIONS WITHOUT BOUNDARIES"
                accentColor="#E9B96E"
                className="mb-8"
              />

              <p className="body-text text-lg leading-relaxed mb-6 text-ivory/90">
                {filmmaker.bio}
              </p>

              <p className="body-text leading-relaxed mb-6">
                {filmmaker.bioExtended}
              </p>

              <p className="body-text leading-relaxed mb-8">
                Operating from Chennai, the historic heartbeat of South Indian cinema, S Vijay Krishnan's cinema exists at the intersection of classical dramatic restraint and kinetic modern sensory experience. Whether working on an intimate rural canvas or a sprawling political thriller, his frames are marked by architectural symmetry, nuanced cultural specificity, and deep empathy for human fragility.
              </p>

              <div className="p-6 bg-cinemaBlack/60 border-l-2 border-crimson mb-10">
                <p className="font-editorial text-lg text-ivory italic leading-relaxed">
                  "I do not view cinema as entertainment to pass time, but as an emotional mirror to preserve memory. When an audience leaves the theater, the film must continue breathing inside them."
                </p>
                <p className="eyebrow mt-3 text-crimson">— S Vijay Krishnan</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <MagneticButton href="/filmography" variant="primary">
                  Explore Filmography <ArrowRight size={16} />
                </MagneticButton>
                <MagneticButton href="/contact" variant="secondary">
                  Discuss a Project
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Journey Timeline ─────────────────────────────────── */}
      <section className="section-padding bg-cinemaBlack relative overflow-hidden">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Evolution"
            heading="THE CINEMATIC ODYSSEY"
            accentColor="#8B5CF6"
            className="mb-20"
          />

          <div className="relative">
            {/* Center connecting line */}
            <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-violet via-gold to-crimson -translate-x-1/2 opacity-30" />

            <div className="space-y-12 lg:space-y-20">
              {journeyMilestones.map((item, index) => {
                const isEven = index % 2 === 0;
                const Icon = item.icon;

                return (
                  <div
                    key={item.year}
                    className={`flex flex-col lg:flex-row items-center ${
                      isEven ? 'lg:flex-row-reverse' : ''
                    } gap-8 lg:gap-16`}
                  >
                    {/* Content Box */}
                    <div className="w-full lg:w-1/2">
                      <div
                        className="p-8 bg-charcoal border transition-all duration-500 hover:border-opacity-60 group"
                        style={{ borderColor: `${item.accent}30` }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className="font-display text-3xl font-bold tracking-widest"
                            style={{ color: item.accent }}
                          >
                            {item.year}
                          </span>
                          <span className="p-2 rounded-full bg-graphite" style={{ color: item.accent }}>
                            <Icon size={18} />
                          </span>
                        </div>
                        <h3 className="font-display text-2xl text-ivory mb-1 tracking-wide group-hover:text-gold transition-colors">
                          {item.title}
                        </h3>
                        <p className="eyebrow text-xs mb-4" style={{ color: item.accent }}>
                          {item.subtitle}
                        </p>
                        <p className="body-text text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="hidden lg:flex items-center justify-center relative z-10">
                      <div
                        className="w-4 h-4 rounded-full border-2 bg-cinemaBlack shadow-lg"
                        style={{ borderColor: item.accent }}
                      />
                    </div>

                    {/* Blank spacer for other side */}
                    <div className="hidden lg:block w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Working Process ─────────────────────────────────── */}
      <section className="section-padding bg-graphite relative">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Methodology"
            heading="THE FIVE PILLARS OF CRAFT"
            accentColor="#2DD4BF"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 bg-charcoal border border-ivory/10 hover:border-teal/50 transition-all duration-500 flex flex-col justify-between group"
              >
                <div>
                  <span className="font-display text-4xl text-teal/40 group-hover:text-teal transition-colors block mb-4">
                    {step.step}
                  </span>
                  <p className="eyebrow text-xs text-gold mb-2">{step.phase}</p>
                  <h3 className="font-display text-xl text-ivory mb-4 tracking-wide">{step.headline}</h3>
                </div>
                <p className="font-body text-xs text-silver leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Filmmaker's Personal Creative Manifesto ─────────────── */}
      <section className="section-padding bg-cinemaBlack relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(233,185,110,0.2) 0%, transparent 60%)',
          }}
        />

        <div className="container-wide relative z-10 max-w-4xl mx-auto text-center">
          <p className="eyebrow text-gold mb-6">Director’s Manifesto</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-ivory mb-10 leading-tight">
            "WE DO NOT MAKE FILMS FOR SCREENS.<br />WE MAKE FILMS FOR MEMORIES."
          </h2>

          <div className="w-24 h-px bg-gold mx-auto mb-10" />

          <div className="space-y-6 text-silver font-editorial text-lg md:text-xl leading-relaxed text-justify md:text-center italic font-light">
            <p>
              In an era dominated by fleeting algorithms and disposable content, true cinema remains a sanctuary. It is one of the last places where hundreds of strangers gather in the dark to experience the same heartbeat, weep at the same silence, and marvel at the same glimmer of redemption.
            </p>
            <p>
              To direct a film is to accept stewardship of that communion. It demands absolute honesty to our culture, relentless discipline in our craft, and fearlessness in our vulnerability. That is the only cinema worth making.
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-gold/50 shadow-[0_0_30px_rgba(233,185,110,0.3)] mb-4 bg-cinemaBlack">
              <img
                src="/logo/android-chrome-192x192.png"
                alt="S Vijay Krishnan Emblem"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-display text-2xl text-ivory tracking-widest">S VIJAY KRISHNAN</p>
            <p className="eyebrow text-xs text-silver/60 mt-1">Producer • Director • Chennai, India</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
