import React, { useState } from 'react';
import { Sparkles, Eye, Volume2, Heart, Compass, Feather, Flame, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import MagneticButton from '../components/ui/MagneticButton';

interface VisionPillar {
  number: string;
  theme: string;
  title: string;
  statement: string;
  notebookNote: string;
  image: string;
  accent: string;
  icon: React.ElementType;
}

const visionPillars: VisionPillar[] = [
  {
    number: '01',
    theme: 'THE NARRATIVE ANCHOR',
    title: 'STORYTELLING & MYTHOS',
    statement:
      'Stories are not inventions of the intellect; they are archetypes sleeping within the earth. In Tamil storytelling, the landscape itself holds memory. We root our narratives in historical cadence while speaking directly to universal modern anxiety.',
    notebookNote:
      '"Ask not: What happens next? Ask: What does the protagonist refuse to confess to themselves?"',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    accent: '#8B5CF6',
    icon: Feather,
  },
  {
    number: '02',
    theme: 'VISCERAL RESONANCE',
    title: 'EMOTION OVER PLOT',
    statement:
      'Audiences do not remember plot intricacies six months after leaving a dark cinema hall; they remember the temperature of a tear, the suffocating tension of an unanswered question, or the sudden euphoria of a shared gaze.',
    notebookNote:
      '"Every scene must possess an emotional pivot — a moment where the internal power shifts irreparably."',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1200&q=80',
    accent: '#FF304F',
    icon: Heart,
  },
  {
    number: '03',
    theme: 'FRAME GEOMETRY',
    title: 'VISUAL LANGUAGE & LIGHT',
    statement:
      'We shoot on wide anamorphic glass and sculpted natural light. Chiaroscuro lighting is not an aesthetic indulgence — it represents the eternal moral struggle between public duty and subterranean private desire.',
    notebookNote:
      '"Let the shadows do the talking. The brightest light reveals the least truth."',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    accent: '#E9B96E',
    icon: Eye,
  },
  {
    number: '04',
    theme: 'HUMAN CONTRADICTION',
    title: 'CHARACTER ARCHITECTURE',
    statement:
      'We reject clean heroes and cartoonish villains. Our characters are fractured, passionate, stubborn, and desperately seeking belonging within rigid societal expectations. They act out of love, fear, and instinct.',
    notebookNote:
      '"Give the antagonist the most undeniable argument in the room, and force the hero to bleed for their conviction."',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
    accent: '#2DD4BF',
    icon: Compass,
  },
  {
    number: '05',
    theme: 'AURAL ARCHITECTURE',
    title: 'SOUNDSCAPES & SILENCE',
    statement:
      'Silence is cinema’s most courageous instrument. In Indian cinema, sound has often been deployed as non-stop assault. We treat the acoustic space as sacred: the rustle of dry leaves in Madurai, a distant train whistle, the heavy pause before heartbreak.',
    notebookNote:
      '"Mix for the breath. If the audience cannot hear the character inhale, the frame is emotionally dead."',
    image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1200&q=80',
    accent: '#3478F6',
    icon: Volume2,
  },
  {
    number: '06',
    theme: 'LOCAL ROOTS, GLOBAL SOUL',
    title: 'CULTURAL IDENTITY & DIASPORA',
    statement:
      'The more fiercely specific you are about your own soil — the red dust of Tirunelveli, the rain over Marina beach, the Carnatic ragas of temple festivals — the more globally profound your film becomes.',
    notebookNote:
      '"Do not homogenize for foreign audiences. Universal truth is found only at the bottom of local roots."',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    accent: '#F542A7',
    icon: Flame,
  },
];

const CreativeVision: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState(0);
  const active = visionPillars[selectedPillar];

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="min-h-[80vh] flex items-end bg-cinemaBlack relative overflow-hidden pt-28 pb-16">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 30%, #8B5CF625 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 80% 80%, #FF304F15 0%, transparent 60%)',
          }}
        />

        <div className="container-wide relative z-10 w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-violet/50 shadow-[0_0_12px_rgba(139,92,246,0.25)] shrink-0">
              <img
                src="/logo/apple-touch-icon.png"
                alt="Vijay Krishnan"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-px bg-violet" />
              <p className="eyebrow text-violet">The Director’s Notebook</p>
            </div>
          </div>

          <h1 className="font-display text-[64px] sm:text-[90px] md:text-[130px] lg:text-[160px] leading-[0.88] text-ivory tracking-tight mb-8">
            EVERY FRAME<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(139,92,246,0.8)' }}>
              BEGINS WITH VISION.
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-ivory/10 pt-8 items-end">
            <p className="md:col-span-8 font-editorial text-2xl md:text-3xl text-ivory font-light italic leading-relaxed">
              "We do not capture light; we capture what light touches when everyone else has looked away."
            </p>
            <div className="md:col-span-4 flex md:justify-end">
              <span className="eyebrow text-silver/60">AESTHETIC ARCHIVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Interactive Director's Codex ─────────────────────────── */}
      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          <SectionHeading
            eyebrow="The Codex"
            heading="SIX CORNERSTONES OF CINEMATIC EXPRESSION"
            accentColor="#8B5CF6"
            className="mb-16"
          />

          {/* Tab Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-12">
            {visionPillars.map((p, i) => (
              <button
                key={p.number}
                onClick={() => setSelectedPillar(i)}
                className={`p-4 text-left border transition-all duration-300 ${
                  selectedPillar === i
                    ? 'border-violet bg-graphite text-ivory'
                    : 'border-ivory/10 bg-cinemaBlack/40 text-silver/60 hover:text-ivory hover:border-ivory/20'
                }`}
              >
                <span className="font-display text-xs text-violet block mb-1">PILLAR {p.number}</span>
                <span className="font-display text-sm tracking-wide line-clamp-1">{p.title}</span>
              </button>
            ))}
          </div>

          {/* Active Split-Screen Stage */}
          <div className="bg-graphite border border-ivory/10 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Visual Artwork */}
              <div className="lg:col-span-6 relative aspect-square lg:aspect-auto min-h-[400px] overflow-hidden bg-cinemaBlack">
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent opacity-80" />

                {/* Director's Notebook Note Box */}
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-cinemaBlack/90 border-l-2 border-gold backdrop-blur-md">
                  <p className="eyebrow text-gold text-[10px] mb-2">Director's Margin Note</p>
                  <p className="font-editorial text-base text-ivory italic leading-snug">
                    {active.notebookNote}
                  </p>
                </div>
              </div>

              {/* Right Column: Editorial Philosophy */}
              <div className="lg:col-span-6 p-8 md:p-14 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-display text-3xl text-violet">{active.number}</span>
                    <span className="w-8 h-px bg-violet/40" />
                    <p className="eyebrow" style={{ color: active.accent }}>{active.theme}</p>
                  </div>

                  <h3 className="font-display text-4xl md:text-5xl text-ivory mb-6 tracking-wide">
                    {active.title}
                  </h3>

                  <div className="w-12 h-px bg-gold mb-6" />

                  <p className="body-text text-base md:text-lg leading-relaxed text-ivory/90 mb-8">
                    {active.statement}
                  </p>
                </div>

                <div className="pt-6 border-t border-ivory/10 flex items-center justify-between">
                  <span className="font-caption italic text-silver/60 text-xs">
                    S Vijay Krishnan Vision Archives
                  </span>
                  <MagneticButton href="/filmography" variant="ghost" className="text-xs">
                    See This in Action <ArrowRight size={14} />
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Cinematic Influences & Dialogue ──────────────────────── */}
      <section className="section-padding bg-cinemaBlack border-t border-ivory/10">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Lineage"
            heading="CONVERSATIONS WITH MASTERS"
            accentColor="#E9B96E"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-charcoal border border-ivory/10">
              <span className="eyebrow text-gold block mb-2">Tamil Master Influence</span>
              <h4 className="font-display text-2xl text-ivory mb-4">MAHENDRA & BALU MAHENDRA</h4>
              <p className="body-text text-sm leading-relaxed">
                The poetic economy of gesture. Teaching Indian cinema that quiet domestic pauses carry more emotional thunder than thousand-word speeches.
              </p>
            </div>

            <div className="p-8 bg-charcoal border border-ivory/10">
              <span className="eyebrow text-gold block mb-2">World Cinema Parallel</span>
              <h4 className="font-display text-2xl text-ivory mb-4">ANDREI TARKOVSKY</h4>
              <p className="body-text text-sm leading-relaxed">
                Sculpting in time. Treating the screen as an open spiritual canvas where nature, water, and fire mirror the internal condition of wandering souls.
              </p>
            </div>

            <div className="p-8 bg-charcoal border border-ivory/10">
              <span className="eyebrow text-gold block mb-2">Modern Kinship</span>
              <h4 className="font-display text-2xl text-ivory mb-4">WONG KAR-WAI & MANI RATNAM</h4>
              <p className="body-text text-sm leading-relaxed">
                Color as emotional weather. Kinetic camera moves coupled with step-printing and slow dissolves to simulate the subjective haze of memory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Collaboration Callout ────────────────────────────────── */}
      <section className="section-padding bg-graphite text-center relative overflow-hidden">
        <div className="container-wide max-w-2xl mx-auto">
          <Sparkles size={32} className="mx-auto text-gold mb-6" />
          <h2 className="font-display text-4xl md:text-5xl text-ivory mb-6">
            HAVE A VISION THAT NEEDS DIRECTING?
          </h2>
          <p className="body-text text-base leading-relaxed mb-8">
            Whether you hold an unfinished screenplay, a compelling true-life property, or a bold cinematic concept, let’s discuss how to bring it to life with artistic fearlessness.
          </p>
          <MagneticButton href="/contact" variant="primary">
            Start the Dialogue <ArrowRight size={16} />
          </MagneticButton>
        </div>
      </section>
    </>
  );
};

export default CreativeVision;
