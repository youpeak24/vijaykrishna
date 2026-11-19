import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { gallery, type GalleryItem } from '../data/gallery';

type GalleryCategory = 'all' | 'on-set' | 'behind-the-scenes' | 'film-stills' | 'portraits' | 'events';

const categories: { label: string; value: GalleryCategory }[] = [
  { label: 'ALL FRAMES', value: 'all' },
  { label: 'ON SET', value: 'on-set' },
  { label: 'BEHIND THE SCENES', value: 'behind-the-scenes' },
  { label: 'FILM STILLS', value: 'film-stills' },
  { label: 'PORTRAITS', value: 'portraits' },
  { label: 'EVENTS', value: 'events' },
];

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<GalleryCategory>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredItems = filter === 'all'
    ? gallery
    : gallery.filter((item) => item.category === filter);

  const activeItem: GalleryItem | null =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const handlePrev = useCallback(() => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) =>
        prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
      );
    }
  }, [activeLightboxIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) =>
        prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
      );
    }
  }, [activeLightboxIndex, filteredItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, handlePrev, handleNext]);

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="min-h-[70vh] flex items-end bg-cinemaBlack relative overflow-hidden pt-28 pb-16">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 75% 30%, #2DD4BF18 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 20% 70%, #8B5CF615 0%, transparent 50%)',
          }}
        />

        <div className="container-wide relative z-10 w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-teal/50 shadow-[0_0_12px_rgba(45,212,191,0.25)] shrink-0">
              <img
                src="/logo/apple-touch-icon.png"
                alt="Vijay Krishnan"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-px bg-teal" />
              <p className="eyebrow text-teal">Visual Archive</p>
            </div>
          </div>

          <h1 className="font-display text-[64px] sm:text-[90px] md:text-[130px] lg:text-[160px] leading-[0.88] text-ivory tracking-tight mb-8">
            FRAMES IN<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(45,212,191,0.8)' }}>
              RETROSPECT.
            </span>
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-ivory/10 pt-8">
            <p className="body-text text-lg max-w-xl text-ivory/90">
              A curated photographic chronicle documenting the tactile reality of cinema: 4 AM call times, Nilgiri rain squalls, color suite grading sessions, and festival premieres.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <span className="font-display text-3xl text-teal">{gallery.length}</span>
                <span className="font-body text-xs text-silver block uppercase tracking-wider">Archived Stills</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Category Filter Navigation ───────────────────────────── */}
      <section className="sticky top-20 z-40 bg-cinemaBlack/95 backdrop-blur-md border-y border-ivory/10 py-4">
        <div className="container-wide flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setFilter(cat.value);
                setActiveLightboxIndex(null);
              }}
              className={`px-4 py-2 font-body text-xs font-semibold tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${
                filter === cat.value
                  ? 'bg-ivory text-cinemaBlack shadow-lg'
                  : 'text-silver hover:text-ivory hover:bg-graphite'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ─── Asymmetrical / Masonry Gallery Grid ──────────────────── */}
      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => {
              // Dynamic height for editorial masonry feel
              const aspectClass =
                item.aspectRatio === 'portrait'
                  ? 'aspect-[3/4]'
                  : item.aspectRatio === 'wide'
                  ? 'aspect-[21/9] sm:col-span-2'
                  : item.aspectRatio === 'square'
                  ? 'aspect-square'
                  : 'aspect-[16/10]';

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveLightboxIndex(index)}
                  className={`group relative overflow-hidden bg-cinemaBlack border border-ivory/10 cursor-pointer hover:border-ivory/40 transition-all duration-500 ${aspectClass}`}
                  data-cursor="EXPLORE"
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cinemaBlack via-cinemaBlack/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    <div className="flex justify-end">
                      <span className="text-[10px] font-body uppercase tracking-widest px-2.5 py-1 bg-cinemaBlack/80 border border-ivory/20 text-ivory">
                        {item.category.replace(/-/g, ' ')}
                      </span>
                    </div>

                    <div>
                      {item.project && (
                        <p className="eyebrow text-gold text-[10px] mb-1">{item.project}</p>
                      )}
                      <h4 className="font-display text-xl text-ivory tracking-wide mb-1">
                        {item.caption}
                      </h4>
                      <div className="flex items-center gap-4 text-[11px] text-silver/80 font-body">
                        {item.location && <span>{item.location}</span>}
                        <span>{item.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Fullscreen Accessible Lightbox ───────────────────────── */}
      {activeItem && activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-cinemaBlack/95 backdrop-blur-md p-4 sm:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveLightboxIndex(null);
          }}
        >
          {/* Top Bar with counter & close */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <span className="font-display text-sm tracking-widest text-silver">
                {activeLightboxIndex + 1} / {filteredItems.length}
              </span>
              <span className="text-silver/40">•</span>
              <span className="eyebrow text-[10px] text-gold uppercase">
                {activeItem.category.replace(/-/g, ' ')}
              </span>
            </div>

            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="text-silver hover:text-ivory p-2 bg-graphite/80 border border-ivory/10 transition-colors"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-graphite/80 border border-ivory/10 text-silver hover:text-ivory transition-colors"
            aria-label="Previous Frame"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-graphite/80 border border-ivory/10 text-silver hover:text-ivory transition-colors"
            aria-label="Next Frame"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image & Caption Stage */}
          <div className="relative max-w-5xl w-full flex flex-col items-center max-h-[85vh]">
            <img
              src={activeItem.src}
              alt={activeItem.caption}
              className="w-auto h-auto max-h-[70vh] max-w-full object-contain border border-ivory/20 shadow-2xl"
            />

            {/* Caption Card */}
            <div className="mt-4 p-4 bg-graphite/90 border border-ivory/10 text-center max-w-2xl w-full">
              {activeItem.project && (
                <p className="eyebrow text-gold text-xs mb-1">{activeItem.project}</p>
              )}
              <h3 className="font-display text-xl text-ivory tracking-wide mb-1">
                {activeItem.caption}
              </h3>
              <div className="flex items-center justify-center gap-4 text-xs font-body text-silver/70">
                {activeItem.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-teal" /> {activeItem.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar size={12} className="text-teal" /> {activeItem.year}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
