import React from "react";

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-gray-50 rounded-xl p-8 mb-14">
      <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Step 1 */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
            <span className="text-lg font-bold">1</span>
          </div>
          <h3 className="font-semibold mb-2">Paste URL</h3>
          <p className="text-gray-600 text-sm">Copy and paste the video URL from YouTube, TikTok, or other supported platforms.</p>
        </div>
        
        {/* Step 2 */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
            <span className="text-lg font-bold">2</span>
          </div>
          <h3 className="font-semibold mb-2">Select Format</h3>
          <p className="text-gray-600 text-sm">Choose your preferred video quality, format or extract audio only.</p>
        </div>
        
        {/* Step 3 */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
            <span className="text-lg font-bold">3</span>
          </div>
          <h3 className="font-semibold mb-2">Process Video</h3>
          <p className="text-gray-600 text-sm">Our system will process the video for downloading in your selected format.</p>
        </div>
        
        {/* Step 4 */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
            <span className="text-lg font-bold">4</span>
          </div>
          <h3 className="font-semibold mb-2">Download</h3>
          <p className="text-gray-600 text-sm">Get your video file instantly, ready to watch offline on any device.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
