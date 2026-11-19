import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Clock, Globe, Film as FilmIcon, Sparkles } from 'lucide-react';
import { films } from '../data/films';

type FilterType = 'all' | 'directed' | 'produced' | 'feature' | 'short' | 'upcoming';

const filterOptions: { label: string; value: FilterType }[] = [
  { label: 'ALL FILMS', value: 'all' },
  { label: 'DIRECTED', value: 'directed' },
  { label: 'PRODUCED', value: 'produced' },
  { label: 'FEATURE FILMS', value: 'feature' },
  { label: 'SHORT FILMS', value: 'short' },
  { label: 'UPCOMING', value: 'upcoming' },
];

const Filmography: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFilms = useMemo(() => {
    return films.filter((f) => {
      // Filter tab check
      let matchesTab = true;
      if (filter === 'directed') matchesTab = f.role.toLowerCase().includes('director');
      else if (filter === 'produced') matchesTab = f.role.toLowerCase().includes('producer');
      else if (filter === 'feature') matchesTab = f.type === 'feature';
      else if (filter === 'short') matchesTab = f.type === 'short';
      else if (filter === 'upcoming') matchesTab = f.status === 'post-production' || f.status === 'pre-production';

      if (!matchesTab) return false;

      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = f.title.toLowerCase().includes(query);
        const matchesGenre = f.genre.some((g) => g.toLowerCase().includes(query));
        const matchesSynopsis = f.synopsis.toLowerCase().includes(query);
        return matchesTitle || matchesGenre || matchesSynopsis;
      }

      return true;
    });
  }, [filter, searchQuery]);

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="min-h-[70vh] flex items-end bg-cinemaBlack relative overflow-hidden pt-28 pb-16">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255,48,79,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 20% 80%, rgba(139,92,246,0.12) 0%, transparent 50%)',
          }}
        />

        <div className="container-wide relative z-10 w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-crimson/50 shadow-[0_0_12px_rgba(255,48,79,0.25)] shrink-0">
              <img
                src="/logo/apple-touch-icon.png"
                alt="Vijay Krishnan"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-px bg-crimson" />
              <p className="eyebrow text-crimson">The Cinematic Archive</p>
            </div>
          </div>

          <h1 className="font-display text-[64px] sm:text-[90px] md:text-[130px] lg:text-[160px] leading-[0.88] text-ivory tracking-tight mb-8">
            EVERY FILM.<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(245,240,232,0.7)' }}>
              A NEW UNIVERSE.
            </span>
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-ivory/10 pt-8">
            <p className="body-text text-lg max-w-xl">
              From intimate character studies to large-scale social epics, each project is crafted with visual rigour, emotional resonance, and deep cultural resonance.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <span className="font-display text-3xl text-gold">{films.length}</span>
                <span className="font-body text-xs text-silver block uppercase tracking-wider">Archived Works</span>
              </div>
              <div className="w-px h-8 bg-ivory/10" />
              <div>
                <span className="font-display text-3xl text-crimson">12+</span>
                <span className="font-body text-xs text-silver block uppercase tracking-wider">Years Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Filter & Search Bar ──────────────────────────────────── */}
      <section className="sticky top-20 z-40 bg-cinemaBlack/95 backdrop-blur-md border-y border-ivory/10 py-4">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Filter pills */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={`px-4 py-2 font-body text-xs font-semibold tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${
                  filter === opt.value
                    ? 'bg-ivory text-cinemaBlack shadow-lg'
                    : 'text-silver hover:text-ivory hover:bg-graphite'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-silver/60" />
            <input
              type="text"
              placeholder="Search by title or genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-graphite/80 border border-ivory/10 focus:border-gold pl-9 pr-4 py-2 font-body text-xs text-ivory placeholder:text-silver/40 outline-none transition-colors"
            />
          </div>
        </div>
      </section>

      {/* ─── Films Showcase Grid ─────────────────────────────────── */}
      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          {filteredFilms.length === 0 ? (
            <div className="py-24 text-center border border-ivory/10 p-12">
              <FilmIcon size={48} className="mx-auto text-silver/40 mb-4" />
              <h3 className="font-display text-3xl text-ivory mb-2">NO FILMS FOUND</h3>
              <p className="body-text text-sm">Try adjusting your filter or search query.</p>
              <button
                onClick={() => {
                  setFilter('all');
                  setSearchQuery('');
                }}
                className="mt-6 btn-secondary text-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFilms.map((film) => (
                <Link
                  key={film.id}
                  to={`/films/${film.slug}`}
                  className="group relative flex flex-col bg-graphite border border-ivory/10 overflow-hidden hover:border-ivory/30 transition-all duration-500"
                  data-cursor="EXPLORE"
                >
                  {/* Poster Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-cinemaBlack">
                    <img
                      src={film.poster}
                      alt={film.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/20 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      {film.status !== 'released' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet text-ivory font-body text-[10px] tracking-widest uppercase font-semibold">
                          <Sparkles size={10} /> {film.status}
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-cinemaBlack/80 text-silver font-body text-[10px] tracking-widest uppercase border border-ivory/10">
                          {film.year}
                        </span>
                      )}
                    </div>

                    {/* Role Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 bg-cinemaBlack/80 text-gold font-body text-[10px] tracking-widest uppercase border border-gold/30">
                        {film.role}
                      </span>
                    </div>
                  </div>

                  {/* Film Details */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Genres */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {film.genre.map((g) => (
                          <span
                            key={g}
                            className="text-[10px] font-body tracking-wider uppercase px-2 py-0.5 border"
                            style={{ borderColor: `${film.accentColor}40`, color: film.accentColor }}
                          >
                            {g}
                          </span>
                        ))}
                      </div>

                      <h2 className="font-display text-3xl md:text-4xl text-ivory mb-2 group-hover:text-gold transition-colors duration-300">
                        {film.title}
                      </h2>

                      <p className="font-caption italic text-silver/70 text-sm mb-4">
                        "{film.tagline}"
                      </p>

                      <p className="body-text text-sm line-clamp-3 mb-6">
                        {film.synopsis}
                      </p>
                    </div>

                    <div>
                      {/* Metadata bar */}
                      <div className="flex items-center justify-between text-silver/60 text-xs font-body border-t border-ivory/5 pt-4 mb-4">
                        <span className="flex items-center gap-1.5">
                          <Globe size={12} /> {film.language}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} /> {film.runtime}
                        </span>
                      </div>

                      {/* Explore link */}
                      <div className="flex items-center justify-between font-body text-xs font-semibold tracking-widest uppercase pt-2">
                        <span style={{ color: film.accentColor }}>EXPLORE UNIVERSE</span>
                        <ArrowRight
                          size={14}
                          className="transform group-hover:translate-x-1.5 transition-transform duration-300"
                          style={{ color: film.accentColor }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Accent Top Border Bar on Hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ background: film.accentColor }}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Production Inquiries Banner ─────────────────────────── */}
      <section className="section-padding bg-cinemaBlack text-center relative overflow-hidden">
        <div className="container-wide max-w-3xl mx-auto">
          <p className="eyebrow text-gold mb-4">Distributors & Co-Producers</p>
          <h2 className="font-display text-4xl md:text-6xl text-ivory mb-6">
            BRINGING STORIES TO GLOBAL AUDIENCES
          </h2>
          <p className="body-text mb-8">
            Looking to license festival distribution rights, propose international co-productions, or review upcoming screenplays in active development?
          </p>
          <Link to="/contact" className="btn-primary">
            Initiate Production Conversation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Filmography;
