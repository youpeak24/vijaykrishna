import React, { useState } from 'react';
import {
  Camera,
  Edit3,
  Sliders,
  Users,
  Layers,
  Globe,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import MagneticButton from '../components/ui/MagneticButton';

const capabilities = [
  {
    id: '01',
    title: 'CREATIVE DEVELOPMENT',
    tagline: 'Idea Incubation & Screenplay Architecture',
    desc: 'From high-concept inception to locked shooting drafts. We develop original screenplays, secure life-rights, and adapt regional literary works into globally resonant cinematic properties with rigorous script doctoring.',
    details: ['Treatment & Scene-by-Scene Bible', 'Thematic Lookbooks & Character Arcs', 'Dialect & Cultural Consultation', 'Target Audience & Festival Mapping'],
    icon: Edit3,
    color: '#8B5CF6',
  },
  {
    id: '02',
    title: 'PRE-PRODUCTION & WORLD BUILDING',
    tagline: 'Precision Planning Before The First Call',
    desc: 'Transforming text into sensory reality. Deep-dive location scouting across Southern India and international territories, full 3D pre-visualization, color scripts, and exhaustive scheduling logistics.',
    details: ['Location Scouting across Tamil Nadu & Abroad', '3D Scene Pre-visualization & Blocking', 'Period Costume & Prop Fabrication', 'Technical Budgeting & Line Production'],
    icon: Layers,
    color: '#E9B96E',
  },
  {
    id: '03',
    title: 'CASTING & CREW ASSEMBLY',
    tagline: 'Harmonizing Stars and Fresh Discoveries',
    desc: 'Curating electric ensemble casts that elevate the dramatic stakes. We pair veteran industry icons with raw undiscovered talent, surrounded by tier-1 Heads of Department (DoP, Editor, Sound Designer).',
    details: ['Mainstream Star Attachments & Negotiations', 'Grassroots Street & Theater Auditions', 'Chemistry Table Reads & Accent Workshops', 'International Crew Co-ordination'],
    icon: Users,
    color: '#2DD4BF',
  },
  {
    id: '04',
    title: 'ON-SET EXECUTION & PRINCIPAL PHOTOGRAPHY',
    tagline: 'Discipline, Atmosphere & Visual Rigour',
    desc: 'Directing on-set with quiet command and creative safety. We prioritize naturalistic lighting, anamorphic glass, complex multi-camera choreographies, and authentic sync sound capture.',
    details: ['ARRI Alexa Mini LF & RED V-Raptor Packages', 'Anamorphic & Master Prime Lens Suites', 'Live Sync Sound Recording Infrastructure', 'Rigorous Set Safety & Crew Welfare'],
    icon: Camera,
    color: '#FF304F',
  },
  {
    id: '05',
    title: 'POST-PRODUCTION & DI COLOR TIMING',
    tagline: 'Where The Rhythm Of The Story Is Forged',
    desc: 'A state-of-the-art post-production pipeline. Collaborative editing suites, ACES color-managed Baselight DI grading, bespoke orchestral score tracking, and immersive Dolby Atmos mixing.',
    details: ['Avid Media Composer & Premiere Pro Pipelines', 'ACES Color Grading in 4K HDR / DCI-P3', 'Orchestral Score Arrangement & Live Strings', 'Dolby Atmos Theatrical Sound Mastering'],
    icon: Sliders,
    color: '#3478F6',
  },
  {
    id: '06',
    title: 'DISTRIBUTION & OTT SYNDICATION',
    tagline: 'Navigating The Global Market Ecosystem',
    desc: 'Guiding films from domestic theatrical rollout across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh to premier worldwide OTT syndication, satellite rights, and overseas diaspora distribution.',
    details: ['Theatrical Release Planning & P&A Strategy', 'Global OTT (Netflix, Prime, Hotstar) Packaging', 'Overseas Diaspora & Festival Distribution', 'Satellite & Music Rights Monitization'],
    icon: Globe,
    color: '#F542A7',
  },
];

const technicalStandards = [
  { label: 'Capture Format', value: '4K / 6K Raw Digital & 35mm Celluloid' },
  { label: 'Color Space', value: 'ACEScc / DCI-P3 HDR Theatrical Mastering' },
  { label: 'Audio Standard', value: 'Dolby Atmos 7.1.4 & 5.1 Theatrical Mix' },
  { label: 'Optics Philosophy', value: 'Cooke Anamorphic / ARRI Master Primes' },
];

const Production: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="min-h-[75vh] flex items-end bg-cinemaBlack relative overflow-hidden pt-28 pb-16">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 30% 30%, #E9B96E15 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 80% 70%, #FF304F12 0%, transparent 60%)',
          }}
        />

        <div className="container-wide relative z-10 w-full">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/50 shadow-[0_0_15px_rgba(233,185,110,0.3)] bg-graphite shrink-0">
              <img
                src="/logo/apple-touch-icon.png"
                alt="VK Productions"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-px bg-gold" />
              <p className="eyebrow text-gold">VK Productions • Production Excellence</p>
            </div>
          </div>

          <h1 className="font-display text-[64px] sm:text-[90px] md:text-[130px] lg:text-[160px] leading-[0.88] text-ivory tracking-tight mb-8">
            FROM VISION<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(233,185,110,0.7)' }}>
              TO THE BIG SCREEN.
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-ivory/10 pt-8 items-end">
            <p className="md:col-span-8 body-text text-lg text-ivory/90 leading-relaxed">
              VK Productions is a modern independent production banner committed to cinematic ambition, fiscal integrity, and auteur storytelling. We engineer end-to-end productions that bridge regional heart with international theatrical finish.
            </p>
            <div className="md:col-span-4 flex md:justify-end">
              <MagneticButton href="/contact" variant="primary">
                Propose a Co-Production <ArrowRight size={14} />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Core Capabilities Breakdown ──────────────────────────── */}
      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Our Services"
            heading="END-TO-END PRODUCTION CAPABILITIES"
            accentColor="#E9B96E"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.id}
                  className="p-8 bg-graphite border border-ivory/10 hover:border-ivory/30 transition-all duration-500 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Subtle top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ background: cap.color }}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-display text-2xl text-silver/30 group-hover:text-gold transition-colors">
                        {cap.id}
                      </span>
                      <div className="p-3 bg-cinemaBlack/60 rounded-full" style={{ color: cap.color }}>
                        <Icon size={20} />
                      </div>
                    </div>

                    <h3 className="font-display text-2xl text-ivory mb-2 group-hover:text-gold transition-colors">
                      {cap.title}
                    </h3>
                    <p className="eyebrow text-xs mb-4" style={{ color: cap.color }}>
                      {cap.tagline}
                    </p>
                    <p className="body-text text-sm leading-relaxed mb-6">
                      {cap.desc}
                    </p>
                  </div>

                  {/* Checklist */}
                  <ul className="space-y-2 border-t border-ivory/5 pt-4">
                    {cap.details.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 font-body text-xs text-silver/80">
                        <CheckCircle size={12} style={{ color: cap.color }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Production Pipeline Visual Roadmap ───────────────────── */}
      <section className="section-padding bg-cinemaBlack relative">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Workflow Execution"
            heading="THE CINEMATIC ROADMAP"
            accentColor="#8B5CF6"
            className="mb-16"
          />

          {/* Interactive Phase Selector */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-12">
            {capabilities.map((cap, i) => (
              <button
                key={cap.id}
                onClick={() => setActiveTab(i)}
                className={`p-4 text-left border transition-all duration-300 ${
                  activeTab === i
                    ? 'border-gold bg-charcoal text-ivory'
                    : 'border-ivory/10 bg-graphite/40 text-silver hover:border-ivory/30'
                }`}
              >
                <span className="font-display text-xs text-gold block mb-1">STAGE {cap.id}</span>
                <span className="font-display text-sm tracking-wide line-clamp-1">{cap.title}</span>
              </button>
            ))}
          </div>

          {/* Active Phase Card */}
          <div className="p-8 md:p-12 bg-charcoal border border-gold/30">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="font-display text-4xl text-gold mb-2 block">
                  PHASE {capabilities[activeTab].id}
                </span>
                <h3 className="font-display text-3xl md:text-5xl text-ivory mb-4">
                  {capabilities[activeTab].title}
                </h3>
                <p className="font-editorial text-xl text-gold italic mb-6">
                  "{capabilities[activeTab].tagline}"
                </p>
                <p className="body-text text-base leading-relaxed mb-6 text-ivory/80">
                  {capabilities[activeTab].desc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {capabilities[activeTab].details.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-graphite border border-ivory/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span className="font-body text-xs text-silver">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-graphite p-6 border border-ivory/10 text-center">
                <ShieldCheck size={40} className="mx-auto text-gold mb-4" />
                <h4 className="font-display text-xl text-ivory mb-2">PRODUCTION RIGOUR</h4>
                <p className="font-body text-xs text-silver leading-relaxed mb-6">
                  Every stage is monitored with transparent cost control, insurance protections, and union compliances.
                </p>
                <MagneticButton href="/contact" variant="secondary" className="w-full justify-center text-xs">
                  Request Production Portfolio
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Technical Benchmark & Equipment ──────────────────────── */}
      <section className="section-padding bg-graphite border-t border-ivory/10">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Theatrical Benchmarks"
            heading="TECHNICAL SPECIFICATIONS"
            accentColor="#2DD4BF"
            className="mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalStandards.map((item, idx) => (
              <div key={idx} className="p-6 bg-charcoal border border-ivory/10">
                <p className="eyebrow text-xs text-teal mb-2">{item.label}</p>
                <p className="font-display text-xl text-ivory">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Production House Collaboration CTA ──────────────────── */}
      <section className="section-padding bg-cinemaBlack text-center relative overflow-hidden">
        <div className="container-wide max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gold/50 shadow-[0_0_35px_rgba(233,185,110,0.3)] bg-graphite/40">
              <img
                src="/logo/android-chrome-512x512.png"
                alt="VK Productions Banner Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="eyebrow text-gold mb-4">Investment & Co-Production</p>
          <h2 className="font-display text-4xl sm:text-6xl text-ivory mb-6 leading-tight">
            PARTNER WITH VK PRODUCTIONS
          </h2>
          <p className="body-text text-base leading-relaxed mb-10">
            We collaborate with major studios, international film funds, streaming platforms, and independent investors seeking artistically distinguished and commercially robust Indian cinema.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/contact" variant="primary">
              Propose a Project <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton href="/filmography" variant="secondary">
              Review Completed Films
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
};

export default Production;
