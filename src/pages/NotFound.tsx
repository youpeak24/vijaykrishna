import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-cinemaBlack flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, #FF304F 0%, transparent 70%)' }}
        />

        {/* Large 404 */}
        <div className="absolute inset-0 flex items-center justify-center select-none opacity-[0.03]">
          <span className="font-display text-[300px] md:text-[400px] text-ivory leading-none">404</span>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          {/* Frame corners */}
          <div className="absolute -inset-8 md:-inset-16">
            <span className="absolute top-0 left-0 w-6 h-6 border-t border-l border-ivory/20" />
            <span className="absolute top-0 right-0 w-6 h-6 border-t border-r border-ivory/20" />
            <span className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-ivory/20" />
            <span className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-ivory/20" />
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-crimson/50 shadow-[0_0_20px_rgba(255,48,79,0.3)] bg-graphite shrink-0">
              <img
                src="/logo/apple-touch-icon.png"
                alt="Vijay Krishnan"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p className="eyebrow mb-6 text-crimson">Scene Not Found</p>
          <h1 className="font-display text-[80px] md:text-[120px] text-ivory leading-none mb-6">
            CUT.<br />SCENE MISSING.
          </h1>
          <p className="font-caption italic text-silver text-lg md:text-xl mb-12 max-w-md mx-auto">
            This frame doesn't exist in our reel. Let's get you back to the main story.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-3 btn-primary"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
