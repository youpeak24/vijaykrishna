import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Briefcase, Building2, Clapperboard, Film, Sparkles } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import MagneticButton from '../ui/MagneticButton';
import TimelineGallery from '../ui/TimelineGallery';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { timeline } from '../../data/timeline';
import type { TimelineEntry, TimelineIcon } from '../../data/timeline';

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<TimelineIcon, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  briefcase: Briefcase,
  film: Film,
  clapperboard: Clapperboard,
};

/** Dashed vertical mask — used for the link between "now" and the future. */
const DASH_MASK = 'repeating-linear-gradient(to bottom, #000 0 7px, transparent 7px 14px)';

// ─── Spine segment (node → next node) that fills as you scroll ──────────────────
interface SegmentProps {
  from: string;
  to: string;
  dashed: boolean;
  reached: boolean;
}

const SpineSegment: React.FC<SegmentProps> = ({ from, to, dashed, reached }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !trackRef.current || !fillRef.current) return;
    const tween = gsap.fromTo(
      fillRef.current,
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top 65%',
          end: 'bottom 65%',
          scrub: 0.4,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  const mask = dashed ? { WebkitMaskImage: DASH_MASK, maskImage: DASH_MASK } : {};

  return (
    <div
      ref={trackRef}
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-5 top-7 w-[2px] -translate-x-1/2 lg:left-1/2 lg:top-9"
    >
      <div className="absolute inset-0 bg-ivory/[0.09]" style={mask} />
      <div
        ref={fillRef}
        className="absolute left-0 top-0 w-full"
        style={{
          ...mask,
          height: reduced ? (reached ? '100%' : '0%') : undefined,
          background: `linear-gradient(to bottom, ${from}, ${to})`,
          boxShadow: dashed ? undefined : `0 0 14px ${from}88`,
        }}
      />
    </div>
  );
};

// ─── Node on the spine ──────────────────────────────────────────────────────────
const SpineNode: React.FC<{ entry: TimelineEntry; reached: boolean }> = ({ entry, reached }) => {
  const Icon = ICONS[entry.icon];
  const live = entry.status === 'current' || entry.status === 'upcoming';

  return (
    <div className="relative z-10 mt-2 flex justify-center lg:mt-3">
      <div className="relative h-10 w-10 lg:h-12 lg:w-12">
        {live && reached && (
          <span
            className="absolute inset-0 animate-ping rounded-full border opacity-60 motion-reduce:animate-none"
            style={{ borderColor: entry.accent }}
          />
        )}
        <div
          className={`relative grid h-full w-full place-items-center rounded-full bg-[#0D0D12] transition-all duration-700 ${
            entry.status === 'upcoming' ? 'border border-dashed' : 'border'
          }`}
          style={{
            borderColor: reached ? entry.accent : 'rgba(245,240,232,0.18)',
            color: reached ? entry.accent : 'rgba(167,165,175,0.6)',
            boxShadow: reached ? `0 0 0 6px ${entry.accent}1A, 0 0 32px ${entry.accent}55` : 'none',
          }}
        >
          <Icon size={18} strokeWidth={1.75} />
        </div>
      </div>
    </div>
  );
};

// ─── Text column ────────────────────────────────────────────────────────────────
const ChapterText: React.FC<{ entry: TimelineEntry; chapter: number; reached: boolean }> = ({
  entry,
  chapter,
  reached,
}) => {
  const single = entry.title.length === 1;
  const reveal = (delay: number) => ({
    className: `transition-all duration-[900ms] ease-out motion-reduce:transition-none ${
      reached ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <div className="relative">
      {/* Oversized outline year */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-1 -top-12 select-none font-display text-[9rem] leading-none text-transparent md:-top-16 md:text-[13rem]"
        style={{ WebkitTextStroke: `1px ${entry.accent}38` }}
      >
        {entry.year}
      </span>

      <div className="relative z-10 pt-6 md:pt-10">
        {/* Chapter + status */}
        <div {...reveal(0)}>
          <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="eyebrow" style={{ color: entry.accent }}>
              Chapter {String(chapter).padStart(2, '0')}
            </span>
            <span className="h-px w-10" style={{ background: `${entry.accent}80` }} />

            {entry.status === 'current' && (
              <span
                className="inline-flex items-center gap-2 border px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.25em]"
                style={{ borderColor: `${entry.accent}55`, background: `${entry.accent}14`, color: entry.accent }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 motion-reduce:animate-none" style={{ background: entry.accent }} />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: entry.accent }} />
                </span>
                Current Role
              </span>
            )}

            {entry.status === 'upcoming' && (
              <span
                className="relative inline-flex items-center gap-2 overflow-hidden border px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.25em]"
                style={{ borderColor: `${entry.accent}66`, background: `${entry.accent}1A`, color: '#C4B5FD' }}
              >
                <Sparkles size={11} />
                Coming Soon
                <span
                  aria-hidden="true"
                  className="tl-sweep absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                />
              </span>
            )}
          </div>
        </div>

        {/* Period */}
        <div {...reveal(80)}>
          <p className="mb-3 font-display text-xl uppercase tracking-[0.3em] text-silver md:text-2xl">
            {entry.period}
          </p>
        </div>

        {/* Headline */}
        <div {...reveal(160)}>
          <h3 className="mb-4 font-display uppercase">
            {single ? (
              <span
                className="block bg-clip-text pb-1 text-[6.5rem] leading-[0.85] text-transparent md:text-[9rem] xl:text-[11rem]"
                style={{ backgroundImage: `linear-gradient(180deg, #F5F0E8 15%, ${entry.accent} 120%)` }}
              >
                {entry.title[0]}
              </span>
            ) : (
              entry.title.map((line, i) => {
                const last = i === entry.title.length - 1;
                return (
                  <span
                    key={line}
                    className={`block text-[3.5rem] leading-[0.92] sm:text-6xl md:text-7xl xl:text-[5.5rem] ${
                      last
                        ? entry.status === 'upcoming'
                          ? 'tl-shimmer-text bg-clip-text text-transparent'
                          : 'text-transparent'
                        : 'text-ivory'
                    }`}
                    style={
                      last
                        ? entry.status === 'upcoming'
                          ? {
                              backgroundImage: `linear-gradient(90deg, ${entry.accent} 0%, #F5F0E8 25%, ${entry.accent} 50%, #F5F0E8 75%, ${entry.accent} 100%)`,
                            }
                          : { WebkitTextStroke: `1.5px ${entry.accent}` }
                        : undefined
                    }
                  >
                    {line}
                  </span>
                );
              })
            )}
          </h3>
        </div>

        {/* Subtitle */}
        <div {...reveal(240)}>
          <p className="mb-6 font-caption text-2xl italic md:text-3xl" style={{ color: entry.accent }}>
            {entry.subtitle}
          </p>
        </div>

        {/* Company */}
        {entry.organisation && (
          <div {...reveal(300)}>
            <div className="mb-6 inline-flex items-center gap-4 border border-ivory/10 bg-ivory/[0.03] py-3 pl-3 pr-6 backdrop-blur-sm">
              <span
                className="grid h-10 w-10 place-items-center"
                style={{ background: `${entry.accent}1F`, color: entry.accent }}
              >
                <Building2 size={18} strokeWidth={1.75} />
              </span>
              <span>
                <span className="block font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-silver/60">
                  Company
                </span>
                <span className="block font-display text-2xl tracking-wide text-ivory">{entry.organisation}</span>
              </span>
            </div>
          </div>
        )}

        {/* Description */}
        <div {...reveal(360)}>
          <p className="body-text mb-7 max-w-md">{entry.description}</p>
        </div>

        {/* Tags */}
        <div {...reveal(420)}>
          <ul className="flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <li
                key={tag}
                className="border border-ivory/15 px-3 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-silver transition-colors duration-300 hover:text-ivory"
              >
                {tag}
              </li>
            ))}
          </ul>

          {entry.status === 'upcoming' && (
            <div className="mt-8">
              <MagneticButton href="/contact" variant="secondary" data-cursor="CONNECT">
                Stay Updated
                <ArrowRight size={16} />
              </MagneticButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── One chapter (node + text + photos) ─────────────────────────────────────────
const Chapter: React.FC<{ entry: TimelineEntry; index: number }> = ({ entry, index }) => {
  const next = timeline[index + 1];
  const isLast = !next;
  const photoLeft = index % 2 === 0;
  // Reveal + light the node once the chapter reaches ~65% of the viewport, in step with the spine fill.
  const [ref, reached] = useInView<HTMLElement>({ threshold: 0, rootMargin: '0px 0px -35% 0px' });

  const textCell = photoLeft
    ? 'lg:col-start-3 lg:pl-12 xl:pl-16'
    : 'lg:col-start-1 lg:justify-self-end lg:pr-12 xl:pr-16';
  const photoCell = photoLeft
    ? 'lg:col-start-1 lg:flex lg:justify-end lg:pr-12 xl:pr-16'
    : 'lg:col-start-3 lg:pl-12 xl:pl-16';
  const photoShift = photoLeft ? 'lg:-translate-x-12' : 'lg:translate-x-12';

  return (
    <article
      ref={ref}
      aria-label={`${entry.period}: ${entry.subtitle}`}
      className={`relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 lg:grid-cols-[minmax(0,1fr)_6rem_minmax(0,1fr)] lg:gap-x-0 ${
        isLast ? '' : 'pb-24 md:pb-32 lg:pb-40'
      }`}
    >
      {next && (
        <SpineSegment
          from={entry.accent}
          to={next.accent}
          dashed={next.status === 'upcoming'}
          reached={reached}
        />
      )}

      {/* Node */}
      <div className="col-start-1 row-span-2 row-start-1 lg:col-start-2 lg:row-span-1">
        <SpineNode entry={entry} reached={reached} />
      </div>

      {/* Text */}
      <div className={`col-start-2 row-start-1 min-w-0 lg:sticky lg:top-28 lg:row-start-1 lg:max-w-[32rem] lg:self-start ${textCell}`}>
        <ChapterText entry={entry} chapter={index + 1} reached={reached} />
      </div>

      {/* Photos */}
      <div className={`col-start-2 row-start-2 mt-10 min-w-0 lg:row-start-1 lg:mt-0 lg:w-full ${photoCell}`}>
        <div
          className={`w-full max-w-[30rem] transition-all duration-[1200ms] ease-out motion-reduce:transition-none ${
            reached ? 'translate-x-0 opacity-100' : `translate-y-10 opacity-0 ${photoShift}`
          }`}
        >
          <TimelineGallery
            photos={entry.photos}
            accent={entry.accent}
            cinematic={entry.status === 'upcoming'}
            label={`Photos of S Vijay Krishnan — ${entry.subtitle}`}
          />
        </div>
      </div>
    </article>
  );
};

// ─── Section ────────────────────────────────────────────────────────────────────
const CareerTimeline: React.FC = () => {
  const [capRef, capVisible] = useInView<HTMLDivElement>({ threshold: 0.4 });

  return (
    <section
      id="timeline"
      aria-labelledby="timeline-heading"
      className="section-padding relative overflow-x-clip"
      style={{
        background: 'linear-gradient(180deg, #08080B 0%, #0D0D12 10%, #0D0D12 90%, #111116 100%)',
      }}
    >
      {/* Ambient colour glows, one per chapter */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-[18%] h-[34rem] w-[34rem] rounded-full bg-crimson opacity-[0.06] blur-[120px]" />
        <div className="absolute -right-40 top-[46%] h-[34rem] w-[34rem] rounded-full bg-gold opacity-[0.07] blur-[120px]" />
        <div className="absolute -left-32 bottom-[6%] h-[32rem] w-[32rem] rounded-full bg-violet opacity-[0.09] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,240,232,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.6) 1px, transparent 1px)',
            backgroundSize: '90px 90px',
          }}
        />
      </div>

      <div className="container-wide relative z-10">
        <div id="timeline-heading" className="mb-20 md:mb-28">
          <SectionHeading
            eyebrow="Timeline"
            heading="THE JOURNEY SO FAR"
            subtext="From the sets to the boardroom — and back to the big screen. Every chapter, one story."
            accentColor="#E9B96E"
          />
        </div>

        <div className="relative">
          {timeline.map((entry, i) => (
            <Chapter key={entry.id} entry={entry} index={i} />
          ))}
        </div>

        {/* End cap */}
        <div
          ref={capRef}
          className={`mt-24 flex flex-col items-center text-center transition-all duration-1000 motion-reduce:transition-none md:mt-32 ${
            capVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <span className="mb-5 h-16 w-px bg-gradient-to-b from-violet/60 to-transparent" />
          <p className="font-display text-3xl uppercase tracking-[0.3em] text-ivory/80 md:text-4xl">
            To be continued
            <span className="text-violet">…</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;
