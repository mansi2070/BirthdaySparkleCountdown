
import React, { forwardRef } from 'react';

interface ApologySectionProps {
  // Add props if needed
}

const ApologySection = forwardRef<HTMLDivElement, ApologySectionProps>((props, ref) => {
  return (
    <section 
      id="apology" 
      ref={ref}
      className="section min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-primary/5 to-secondary/5 py-20"
    >
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        <h2 className="text-3xl md:text-5xl font-dancing text-primary text-center mb-12">
          My Heartfelt Apologies
        </h2>

        <div className="space-y-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
            <p className="text-lg leading-relaxed">
              I'm sorry I can't treat you right. I'm sorry for not being the best. 
              I'm sorry for hurting you. I'm sorry for everything.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
            <p className="text-lg leading-relaxed">
              I just felt comforted around you. Nobody ever made me feel wanted like you did.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
            <p className="text-lg leading-relaxed">
              I just felt comforted around you.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
            <p className="text-lg leading-relaxed">
              Nobody ever made me feel wanted like you did. ❤️
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

ApologySection.displayName = 'ApologySection';

export default ApologySection;
