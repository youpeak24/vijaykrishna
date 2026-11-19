import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, Sparkles } from 'lucide-react';
import { filmmaker } from '../data/filmmaker';
import { InstagramIcon, YoutubeIcon, LinkedinIcon, ImdbIcon } from '../components/ui/SocialIcons';
import SectionHeading from '../components/ui/SectionHeading';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  estimatedBudget: string;
  message: string;
}

const initialForm: FormData = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  projectType: 'Film Direction',
  estimatedBudget: 'Flexible / In Discussion',
  message: '',
};

const projectTypes = [
  'Film Direction',
  'Film Production',
  'Commercial / Brand Film',
  'Creative Collaboration',
  'Screenplay / Script Consultation',
  'Media / Interview / Jury',
  'Other Inquiry',
];

const budgetRanges = [
  'Independent / Micro-Budget (Under ₹1 Cr)',
  'Medium Canvas (₹1 Cr – ₹5 Cr)',
  'Mainstream Feature (₹5 Cr – ₹20 Cr)',
  'Large Canvas / Epic (₹20 Cr+)',
  'Flexible / In Discussion',
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate real network submission turnaround
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setFormData(initialForm);
    setSubmitted(false);
  };

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="min-h-[75vh] flex items-end bg-cinemaBlack relative overflow-hidden pt-28 pb-16">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 75% 30%, #FF304F18 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 20% 70%, #8B5CF618 0%, transparent 50%)',
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
              <p className="eyebrow text-crimson">Direct Dialogue</p>
            </div>
          </div>

          <h1 className="font-display text-[64px] sm:text-[90px] md:text-[130px] lg:text-[160px] leading-[0.88] text-ivory tracking-tight mb-8">
            GREAT CINEMA<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,48,79,0.8)' }}>
              STARTS HERE.
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-ivory/10 pt-8 items-end">
            <p className="md:col-span-8 body-text text-lg text-ivory/90 leading-relaxed">
              Have a screenplay, commercial campaign, co-production proposal, or festival invitation? Every landmark cinematic journey begins with a candid, focused conversation.
            </p>
            <div className="md:col-span-4 flex md:justify-end">
              <span className="font-display text-xs tracking-widest text-silver/60 uppercase">
                STUDIO CHENNAI • WORLDWIDE ACCESS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact Form & Production Office Info ─────────────────── */}
      <section className="section-padding bg-charcoal">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Direct Contact Details */}
            <div className="lg:col-span-5 space-y-10">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-gold/50 shadow-[0_0_20px_rgba(233,185,110,0.25)] bg-cinemaBlack shrink-0">
                    <img
                      src="/logo/apple-touch-icon.png"
                      alt="VK Productions"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="eyebrow text-crimson block mb-1">Direct Headquarters</span>
                    <span className="font-display text-xl text-ivory tracking-wider">VK PRODUCTIONS</span>
                  </div>
                </div>
                <SectionHeading
                  eyebrow="Reach Us Directly"
                  heading="VK PRODUCTIONS OFFICE"
                  accentColor="#FF304F"
                  className="mb-8"
                />
                <p className="body-text text-base leading-relaxed mb-8">
                  Our main studio and development office is headquartered in Chennai’s film district, with representation partners across Mumbai and international festival hubs.
                </p>
              </div>

              {/* Direct Info Cards */}
              <div className="space-y-6">
                <div className="p-6 bg-graphite border border-ivory/10 flex items-start gap-4">
                  <div className="p-3 bg-cinemaBlack text-crimson rounded-full shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="eyebrow text-[10px] text-silver/60 uppercase mb-1">Electronic Inquiries</p>
                    <a
                      href={`mailto:${filmmaker.email}`}
                      className="font-display text-xl text-ivory hover:text-gold transition-colors block"
                    >
                      {filmmaker.email}
                    </a>
                    <span className="font-body text-xs text-silver/60">Response window: 24-48 business hours</span>
                  </div>
                </div>

                <div className="p-6 bg-graphite border border-ivory/10 flex items-start gap-4">
                  <div className="p-3 bg-cinemaBlack text-gold rounded-full shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="eyebrow text-[10px] text-silver/60 uppercase mb-1">Production Desk</p>
                    <a
                      href={`tel:${filmmaker.phone}`}
                      className="font-display text-xl text-ivory hover:text-gold transition-colors block"
                    >
                      {filmmaker.phone}
                    </a>
                    <span className="font-body text-xs text-silver/60">Direct production manager line</span>
                  </div>
                </div>

                <div className="p-6 bg-graphite border border-ivory/10 flex items-start gap-4">
                  <div className="p-3 bg-cinemaBlack text-teal rounded-full shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="eyebrow text-[10px] text-silver/60 uppercase mb-1">Creative Suite</p>
                    <p className="font-display text-xl text-ivory">VK PRODUCTIONS STUDIO</p>
                    <span className="font-body text-xs text-silver/70">
                      Alwarpet, Chennai, Tamil Nadu 600018, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-ivory/10">
                <p className="eyebrow text-gold mb-4">Official Channels & Film Profiles</p>
                <div className="flex gap-3">
                  <a
                    href={filmmaker.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-ivory/10 text-silver hover:border-gold hover:text-gold transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <InstagramIcon size={18} />
                  </a>
                  <a
                    href={filmmaker.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-ivory/10 text-silver hover:border-crimson hover:text-crimson transition-all duration-300"
                    aria-label="YouTube"
                  >
                    <YoutubeIcon size={18} />
                  </a>
                  <a
                    href={filmmaker.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-ivory/10 text-silver hover:border-royalBlue hover:text-royalBlue transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon size={18} />
                  </a>
                  <a
                    href={filmmaker.social.imdb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-ivory/10 text-silver hover:border-gold hover:text-gold transition-all duration-300"
                    aria-label="IMDb Profile"
                  >
                    <ImdbIcon size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Collaboration Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="p-8 md:p-12 bg-graphite border border-ivory/10 relative">
                {submitted ? (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6 text-teal border border-teal/30">
                      <CheckCircle size={32} />
                    </div>
                    <p className="eyebrow text-teal mb-2">Message Dispatched</p>
                    <h3 className="font-display text-4xl text-ivory mb-4">
                      INQUIRY RECEIVED
                    </h3>
                    <p className="body-text text-base max-w-md mx-auto mb-8">
                      Thank you for reaching out, <strong className="text-ivory">{formData.fullName}</strong>. Your project brief has been securely routed to S Vijay Krishnan’s production desk. We typically review all materials within two business days.
                    </p>
                    <button onClick={handleReset} className="btn-secondary text-xs">
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <p className="eyebrow text-gold mb-1">Collaboration Proposal</p>
                      <h3 className="font-display text-3xl text-ivory mb-6">PROJECT BRIEFING</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block font-body text-xs text-silver/60 tracking-widest uppercase mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Mani Ratnam"
                          className="w-full bg-cinemaBlack/60 border border-ivory/15 focus:border-crimson px-4 py-3 font-body text-sm text-ivory placeholder:text-silver/30 outline-none transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block font-body text-xs text-silver/60 tracking-widest uppercase mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@productionhouse.com"
                          className="w-full bg-cinemaBlack/60 border border-ivory/15 focus:border-crimson px-4 py-3 font-body text-sm text-ivory placeholder:text-silver/30 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div>
                        <label className="block font-body text-xs text-silver/60 tracking-widest uppercase mb-2">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98400 00000"
                          className="w-full bg-cinemaBlack/60 border border-ivory/15 focus:border-crimson px-4 py-3 font-body text-sm text-ivory placeholder:text-silver/30 outline-none transition-colors"
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block font-body text-xs text-silver/60 tracking-widest uppercase mb-2">
                          Company / Production House
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Studio / Independent Producer"
                          className="w-full bg-cinemaBlack/60 border border-ivory/15 focus:border-crimson px-4 py-3 font-body text-sm text-ivory placeholder:text-silver/30 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Project Type */}
                      <div>
                        <label className="block font-body text-xs text-silver/60 tracking-widest uppercase mb-2">
                          Project Classification *
                        </label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full bg-cinemaBlack border border-ivory/15 focus:border-crimson px-4 py-3 font-body text-sm text-ivory outline-none transition-colors"
                        >
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Estimated Budget */}
                      <div>
                        <label className="block font-body text-xs text-silver/60 tracking-widest uppercase mb-2">
                          Estimated Budget Scope
                        </label>
                        <select
                          name="estimatedBudget"
                          value={formData.estimatedBudget}
                          onChange={handleChange}
                          className="w-full bg-cinemaBlack border border-ivory/15 focus:border-crimson px-4 py-3 font-body text-sm text-ivory outline-none transition-colors"
                        >
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>
                              {range}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block font-body text-xs text-silver/60 tracking-widest uppercase mb-2">
                        Project Synopsis & Creative Intent *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please share the logline, stage of development (treatment, draft, attached talent), anticipated timeline, and the specific nature of collaboration desired..."
                        className="w-full bg-cinemaBlack/60 border border-ivory/15 focus:border-crimson px-4 py-3 font-body text-sm text-ivory placeholder:text-silver/30 outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* NDA note */}
                    <div className="flex items-center gap-2 text-xs font-body text-silver/50">
                      <Sparkles size={12} className="text-gold" />
                      <span>All scripts and creative IP submitted remain strictly confidential.</span>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full btn-primary justify-center text-sm py-5 font-bold tracking-widest uppercase transition-all duration-300"
                    >
                      {submitting ? (
                        <span>TRANSMITTING INQUIRY...</span>
                      ) : (
                        <span className="flex items-center gap-2">
                          SUBMIT COLLABORATION BRIEF <Send size={16} />
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
