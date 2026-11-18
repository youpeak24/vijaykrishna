import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Globe,
  Film,
  Play,
  X,
  Volume2,
  VolumeX,
  Award,
  Users,
  Layers,
} from 'lucide-react';
import { films } from '../data/films';
import { filmmaker } from '../data/filmmaker';
import SectionHeading from '../components/ui/SectionHeading';

const FilmDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const film = films.find((f) => f.slug === slug);

  const [trailerModal, setTrailerModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeStill, setActiveStill] = useState<string | null>(null);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [slug]);

  if (!film) {
    return (
      <div className="min-h-screen bg-cinemaBlack flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <p className="eyebrow text-crimson mb-4">404 Error</p>
          <h1 className="font-display text-6xl text-ivory mb-4">FILM NOT FOUND</h1>
          <p className="body-text text-sm mb-8">
            The film project you are seeking does not exist in the official archive or may have been relocated.
          </p>
          <Link to="/filmography" className="btn-secondary inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Return to Filmography
          </Link>
        </div>
      </div>
    );
  }

  // Related films (excluding current)
  const relatedFilms = films.filter((f) => f.id !== film.id).slice(0, 3);

  return (
    <>
      {/* ─── Hero / Full-Bleed Movie Canvas ──────────────────────── */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden pt-28 pb-16">
        {/* Backdrop Image */}
        <div className="absolute inset-0 bg-cinemaBlack">
          <img
            src={film.backdrop}
            alt={film.title}
            className="w-full h-full object-cover opacity-40 scale-105 filter blur-[1px]"
          />
          {/* Gradients */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, #08080B 10%, rgba(8,8,11,0.7) 60%, rgba(8,8,11,0.4) 100%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(ellipse at 80% 30%, ${film.accentColor}30 0%, transparent 60%)`,
            }}
          />
        </div>

        <div className="container-wide relative z-10 w-full">
          {/* Back button */}
          <Link
            to="/filmography"
            className="inline-flex items-center gap-2 font-body text-xs text-silver hover:text-ivory transition-colors duration-300 tracking-widest uppercase mb-8 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Filmography
          </Link>

          {/* Genre badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {film.genre.map((g) => (
              <span
                key={g}
                className="text-[11px] font-body font-semibold tracking-widest uppercase px-3 py-1 border bg-cinemaBlack/60 backdrop-blur-sm"
                style={{ borderColor: `${film.accentColor}60`, color: film.accentColor }}
              >
                {g}
              </span>
            ))}
            <span className="text-[11px] font-body font-semibold tracking-widest uppercase px-3 py-1 border border-ivory/20 text-ivory/70 bg-cinemaBlack/60">
              {film.status.toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-[60px] sm:text-[90px] md:text-[120px] lg:text-[150px] leading-[0.88] text-ivory tracking-tight mb-6">
            {film.title}
          </h1>

          {/* Tagline */}
          <p className="font-editorial text-xl sm:text-2xl md:text-3xl text-gold italic font-light max-w-2xl mb-8">
            "{film.tagline}"
          </p>

          {/* Metadata bar & CTA */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-ivory/15 pt-6">
            <div className="flex flex-wrap gap-6 text-silver font-body text-sm">
              <div className="flex items-center gap-2">
                <Film size={15} style={{ color: film.accentColor }} />
                <span>Role: <strong className="text-ivory">{film.role}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={15} style={{ color: film.accentColor }} />
                <span>Language: <strong className="text-ivory">{film.language}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} style={{ color: film.accentColor }} />
                <span>Runtime: <strong className="text-ivory">{film.runtime}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span>Year: <strong style={{ color: film.accentColor }}>{film.year}</strong></span>
              </div>
            </div>

            {/* Watch Trailer Button */}
            <button
              onClick={() => setTrailerModal(true)}
              className="inline-flex items-center gap-3 px-8 py-4 font-body text-xs font-semibold tracking-widest uppercase text-cinemaBlack bg-gold hover:bg-gold/90 transition-all duration-300 shadow-xl group"
              data-cursor="PLAY"
            >
              <Play size={16} className="fill-cinemaBlack" />
              Watch Official Reel
            </button>
          </div>
        </div>
      </section>

      {/* ─── Synopsis & Director's Statement ─────────────────────── */}
      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Story Synopsis */}
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="The Narrative"
                heading="STORY SYNOPSIS"
                accentColor={film.accentColor}
                className="mb-8"
              />
              <p className="body-text text-lg leading-relaxed text-ivory/90 mb-8 whitespace-pre-line">
                {film.synopsis}
              </p>

              {/* Cast */}
              {film.cast && film.cast.length > 0 && (
                <div className="mt-12 pt-8 border-t border-ivory/10">
                  <div className="flex items-center gap-2 mb-6">
                    <Users size={16} style={{ color: film.accentColor }} />
                    <p className="eyebrow" style={{ color: film.accentColor }}>Principal Cast</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {film.cast.map((item, idx) => (
                      <div key={idx} className="p-4 bg-graphite/60 border border-ivory/5">
                        <p className="font-display text-lg text-ivory">{item.actor}</p>
                        <p className="font-body text-xs text-silver/60 uppercase tracking-wider">{item.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Director's Note Callout */}
            <div className="lg:col-span-5">
              <div
                className="p-8 md:p-10 bg-graphite border relative overflow-hidden"
                style={{ borderColor: `${film.accentColor}30` }}
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none rounded-full blur-2xl"
                  style={{ background: film.accentColor }}
                />

                <p className="eyebrow mb-6" style={{ color: film.accentColor }}>
                  Director’s Creative Note
                </p>

                <p className="font-editorial text-lg md:text-xl text-ivory italic leading-relaxed mb-6 font-light">
                  "{film.directorNote}"
                </p>

                <div className="w-12 h-px bg-gold mb-4" />
                <p className="font-display text-lg text-ivory">{filmmaker.name}</p>
                <p className="font-body text-xs text-silver/60 uppercase tracking-widest">Director & Screenwriter</p>
              </div>

              {/* Awards for this Film */}
              {film.awards && film.awards.length > 0 && (
                <div className="mt-6 p-6 bg-cinemaBlack border border-gold/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Award size={18} className="text-gold" />
                    <p className="eyebrow text-gold">Honors & Festival Circuit</p>
                  </div>
                  <ul className="space-y-3">
                    {film.awards.map((award, i) => (
                      <li key={i} className="font-body text-xs text-silver flex items-start gap-2">
                        <span className="text-gold font-bold">•</span>
                        <span>{award}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Production Credits Grid ─────────────────────────────── */}
      <section className="section-padding bg-graphite border-y border-ivory/10">
        <div className="container-wide">
          <div className="flex items-center gap-2 mb-8">
            <Layers size={18} style={{ color: film.accentColor }} />
            <SectionHeading
              eyebrow="Key Collaborators"
              heading="PRODUCTION CREDITS"
              accentColor={film.accentColor}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pt-4">
            {Object.entries(film.credits).map(([key, val]) => (
              <div key={key} className="p-4 bg-charcoal border border-ivory/5">
                <p className="font-body text-[10px] text-silver/50 tracking-widest uppercase mb-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="font-display text-lg text-ivory tracking-wide">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Film Stills Gallery ─────────────────────────────────── */}
      {film.stills && film.stills.length > 0 && (
        <section className="section-padding bg-cinemaBlack">
          <div className="container-wide">
            <SectionHeading
              eyebrow="Visual Vocabulary"
              heading="CINEMATOGRAPHY STILLS"
              accentColor={film.accentColor}
              className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {film.stills.map((still, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveStill(still)}
                  className="relative aspect-video overflow-hidden group cursor-pointer border border-ivory/10 hover:border-ivory/30"
                  data-cursor="VIEW"
                >
                  <img
                    src={still}
                    alt={`${film.title} still ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-cinemaBlack/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="font-body text-xs text-ivory tracking-widest uppercase px-3 py-1 bg-cinemaBlack/80 border border-ivory/20">
                      Enlarge Still
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Related Projects ────────────────────────────────────── */}
      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="More From The Archive"
              heading="EXPLORE OTHER FILMS"
              accentColor="#E9B96E"
            />
            <Link to="/filmography" className="btn-ghost">
              All Projects <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedFilms.map((other) => (
              <Link
                key={other.id}
                to={`/films/${other.slug}`}
                className="group relative bg-graphite border border-ivory/10 overflow-hidden hover:border-ivory/30 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={other.poster}
                    alt={other.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <span className="font-body text-[10px] text-silver/60 uppercase tracking-widest block mb-2">
                    {other.year} • {other.role}
                  </span>
                  <h3 className="font-display text-2xl text-ivory group-hover:text-gold transition-colors">
                    {other.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Still Lightbox Modal ─────────────────────────────────── */}
      {activeStill && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-cinemaBlack/95 backdrop-blur-md p-4"
          onClick={() => setActiveStill(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh]">
            <img
              src={activeStill}
              alt="Cinematography Still"
              className="w-full h-auto max-h-[85vh] object-contain mx-auto border border-ivory/20"
            />
            <button
              onClick={() => setActiveStill(null)}
              className="absolute -top-10 right-0 text-silver hover:text-ivory font-body text-xs tracking-widest uppercase flex items-center gap-1"
            >
              <X size={16} /> Close Still
            </button>
          </div>
        </div>
      )}

      {/* ─── Video Trailer Player Modal ───────────────────────────── */}
      {trailerModal && (
        <div
          className="fixed inset-0 z-[600] flex items-center justify-center bg-cinemaBlack/95 backdrop-blur-md p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setTrailerModal(false);
          }}
        >
          <div className="relative w-full max-w-5xl bg-cinemaBlack border border-ivory/20 overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-ivory/10 bg-graphite">
              <div>
                <p className="font-display text-lg text-ivory tracking-wide">{film.title}</p>
                <p className="font-body text-[10px] text-silver uppercase tracking-wider">Official Cinematic Teaser Reel</p>
              </div>
              <button
                onClick={() => setTrailerModal(false)}
                className="text-silver hover:text-ivory transition-colors p-1"
                aria-label="Close trailer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Video container */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                src={film.trailerUrl}
                autoPlay
                controls
                muted={isMuted}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Sub-bar */}
            <div className="px-6 py-3 bg-graphite flex items-center justify-between text-xs text-silver font-body">
              <span>{film.year} • Sound Design: {film.credits.soundDesign || 'Dolby Atmos'}</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-ivory flex items-center gap-1"
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilmDetail;
