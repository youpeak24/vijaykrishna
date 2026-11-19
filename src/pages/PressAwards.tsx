import React, { useState } from 'react';
import { Award, ExternalLink, Download, CheckCircle, FileText, ArrowRight } from 'lucide-react';
import { awards } from '../data/awards';
import { press } from '../data/press';
import SectionHeading from '../components/ui/SectionHeading';
import MagneticButton from '../components/ui/MagneticButton';

type TabType = 'all' | 'awards' | 'press' | 'epk';

const PressAwards: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const wins = awards.filter((a) => a.type === 'win');
  const nominations = awards.filter((a) => a.type === 'nomination');

  const handleDownloadEPK = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="min-h-[75vh] flex items-end bg-cinemaBlack relative overflow-hidden pt-28 pb-16">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 75% 30%, #E9B96E18 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 20% 70%, #FF304F15 0%, transparent 50%)',
          }}
        />

        <div className="container-wide relative z-10 w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gold/50 shadow-[0_0_12px_rgba(233,185,110,0.25)] shrink-0">
              <img
                src="/logo/apple-touch-icon.png"
                alt="Vijay Krishnan"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-px bg-gold" />
              <p className="eyebrow text-gold">Honors & Critical Reception</p>
            </div>
          </div>

          <h1 className="font-display text-[64px] sm:text-[90px] md:text-[130px] lg:text-[160px] leading-[0.88] text-ivory tracking-tight mb-8">
            PRESTIGE &<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(233,185,110,0.8)' }}>
              RECOGNITION.
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-ivory/10 pt-8 items-end">
            <p className="md:col-span-8 body-text text-lg text-ivory/90 leading-relaxed">
              From international festival laurels to landmark national reviews, our productions are recognized for uncompromising artistic integrity, technical mastery, and cultural authenticity.
            </p>
            <div className="md:col-span-4 flex items-center md:justify-end gap-6">
              <div>
                <span className="font-display text-4xl text-gold">{wins.length}</span>
                <span className="font-body text-xs text-silver block uppercase tracking-wider">Festival Trophies</span>
              </div>
              <div className="w-px h-8 bg-ivory/10" />
              <div>
                <span className="font-display text-4xl text-crimson">{nominations.length + wins.length}</span>
                <span className="font-body text-xs text-silver block uppercase tracking-wider">Official Selections</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Filter Tabs ──────────────────────────────────────────── */}
      <section className="sticky top-20 z-40 bg-cinemaBlack/95 backdrop-blur-md border-y border-ivory/10 py-4">
        <div className="container-wide flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { label: 'ALL MEDIA & HONORS', value: 'all' as TabType },
            { label: 'FESTIVAL AWARDS & WINS', value: 'awards' as TabType },
            { label: 'PRESS & INTERVIEWS', value: 'press' as TabType },
            { label: 'ELECTRONIC PRESS KIT (EPK)', value: 'epk' as TabType },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 font-body text-xs font-semibold tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.value
                  ? 'bg-gold text-cinemaBlack font-bold shadow-lg'
                  : 'text-silver hover:text-ivory hover:bg-graphite'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ─── Awards & Festival Laurels ────────────────────────────── */}
      {(activeTab === 'all' || activeTab === 'awards') && (
        <section className="section-padding bg-charcoal">
          <div className="container-wide">
            <SectionHeading
              eyebrow="Festival Circuit"
              heading="AWARDS & JURY DISTINCTIONS"
              accentColor="#E9B96E"
              className="mb-16"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {awards.map((award) => {
                const isWin = award.type === 'win';
                return (
                  <div
                    key={award.id}
                    className={`p-8 bg-graphite border transition-all duration-500 group relative overflow-hidden ${
                      isWin ? 'border-gold/30 hover:border-gold' : 'border-ivory/10 hover:border-ivory/30'
                    }`}
                  >
                    {/* Background Laurels Emblem styling */}
                    <div className="absolute top-4 right-6 font-display text-5xl text-ivory/5 select-none group-hover:text-gold/10 transition-colors">
                      {award.year}
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <span className={`p-2 rounded-full ${isWin ? 'bg-gold/10 text-gold' : 'bg-silver/10 text-silver'}`}>
                        <Award size={18} />
                      </span>
                      <span className={`px-2.5 py-0.5 text-[10px] font-body uppercase tracking-widest font-semibold border ${
                        isWin ? 'border-gold text-gold bg-gold/10' : 'border-silver/20 text-silver/60'
                      }`}>
                        {isWin ? 'WINNER / GOLD LAUREL' : 'OFFICIAL SELECTION'}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl text-ivory mb-2 group-hover:text-gold transition-colors">
                      {award.title}
                    </h3>

                    <p className="eyebrow text-xs text-gold mb-4">
                      {award.festival} • {award.year}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-ivory/5 text-xs font-body text-silver/70">
                      <span>Project: <strong className="text-ivory">{award.project}</strong></span>
                      <span>Category: <strong className="text-ivory">{award.category}</strong></span>
                      <span>{award.country}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── Press Coverage & Features ────────────────────────────── */}
      {(activeTab === 'all' || activeTab === 'press') && (
        <section className="section-padding bg-cinemaBlack">
          <div className="container-wide">
            <SectionHeading
              eyebrow="Critical Acclaim"
              heading="PUBLICATIONS & REVIEWS"
              accentColor="#FF304F"
              className="mb-16"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {press.map((item) => (
                <article
                  key={item.id}
                  className="p-8 bg-charcoal border border-ivory/10 hover:border-ivory/30 transition-all duration-500 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-graphite flex items-center justify-center border border-ivory/10">
                          <span className="font-display text-sm text-gold">{item.logo}</span>
                        </div>
                        <div>
                          <p className="font-body text-xs font-semibold text-ivory">{item.publication}</p>
                          <p className="font-body text-[10px] text-silver/50 uppercase tracking-wider">{item.type}</p>
                        </div>
                      </div>
                      <span className="font-body text-xs text-silver/40">
                        {new Date(item.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}
                      </span>
                    </div>

                    <h3 className="font-editorial text-xl text-ivory group-hover:text-gold transition-colors duration-300 mb-4 leading-snug">
                      "{item.headline}"
                    </h3>

                    <p className="body-text text-sm leading-relaxed mb-6">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-ivory/5 flex items-center justify-between">
                    <span className="eyebrow text-[10px] text-silver/60">Verified Feature</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-gold tracking-widest uppercase hover:text-ivory transition-colors"
                    >
                      Read Feature <ExternalLink size={12} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Electronic Press Kit (EPK) Section ──────────────────── */}
      {(activeTab === 'all' || activeTab === 'epk') && (
        <section className="section-padding bg-graphite relative overflow-hidden">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto p-8 md:p-12 bg-charcoal border border-gold/30 relative">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8 pb-8 border-b border-ivory/10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={18} className="text-gold" />
                    <p className="eyebrow text-gold">Official Media Kit 2025/2026</p>
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl text-ivory">
                    ELECTRONIC PRESS KIT (EPK)
                  </h3>
                  <p className="body-text text-sm mt-2">
                    For festival programmers, journalists, distributors, and media inquiries. Includes official biography, high-resolution still photography, and filmography loglines.
                  </p>
                </div>

                <button
                  onClick={handleDownloadEPK}
                  className="btn-primary whitespace-nowrap self-start md:self-auto shrink-0"
                >
                  <Download size={16} /> Download Full EPK (ZIP)
                </button>
              </div>

              {downloadSuccess && (
                <div className="mb-6 p-4 bg-teal/10 border border-teal text-teal font-body text-xs flex items-center gap-2">
                  <CheckCircle size={16} /> Media Kit archive downloaded. For exclusive interview requests, please contact press office.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-graphite border border-ivory/5">
                  <p className="font-display text-lg text-ivory mb-1">HIGH-RES STILLS</p>
                  <p className="font-body text-xs text-silver/60">300 DPI TIF & JPG Production Photography for print.</p>
                </div>
                <div className="p-4 bg-graphite border border-ivory/5">
                  <p className="font-display text-lg text-ivory mb-1">DIRECTOR BIOGRAPHY</p>
                  <p className="font-body text-xs text-silver/60">Full, 250-word, and 100-word biographies with headshots.</p>
                </div>
                <div className="p-4 bg-graphite border border-ivory/5">
                  <p className="font-display text-lg text-ivory mb-1">FESTIVAL SPECS</p>
                  <p className="font-body text-xs text-silver/60">DCP technical specs, subtitling bibles & trailer links.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Media Inquiries CTA ──────────────────────────────────── */}
      <section className="section-padding bg-cinemaBlack text-center">
        <div className="container-wide max-w-2xl mx-auto">
          <p className="eyebrow text-gold mb-4">Press Office</p>
          <h2 className="font-display text-4xl md:text-5xl text-ivory mb-6">
            SCHEDULE AN INTERVIEW OR JURY INQUIRY
          </h2>
          <p className="body-text text-base leading-relaxed mb-8">
            For press credentials, panel appearances, festival jury invitations, and feature stories, please contact our representation directly.
          </p>
          <MagneticButton href="/contact" variant="primary">
            Contact Press Office <ArrowRight size={16} />
          </MagneticButton>
        </div>
      </section>
    </>
  );
};

export default PressAwards;
