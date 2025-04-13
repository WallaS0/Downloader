import React from "react";
import { Zap, Award, Shield } from "lucide-react";

const FeatureCards: React.FC = () => {
  return (
    <section className="mb-14">
      <h2 className="text-2xl font-bold text-center mb-8">Why Choose VideoGrab?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Speed Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
          <p className="text-gray-600">Download videos in seconds with our optimized technology. No waiting, no buffering.</p>
        </div>
        
        {/* Quality Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-4">
            <Award className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">High Quality</h3>
          <p className="text-gray-600">Choose from multiple quality options including HD and 4K for the best viewing experience.</p>
        </div>
        
        {/* Security Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
            <Shield className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
          <p className="text-gray-600">Your downloads are secure and private. We don't store your video content on our servers.</p>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
