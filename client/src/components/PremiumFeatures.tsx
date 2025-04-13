import React from "react";
import { Button } from "@/components/ui/button";
import { Layers, Droplet, Cloud } from "lucide-react";
import { Link } from "wouter";

const PremiumFeatures: React.FC = () => {
  return (
    <section className="mb-14">
      <div className="bg-gradient-to-r from-primary to-purple-600 rounded-xl overflow-hidden shadow-lg text-white">
        <div className="p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Unlock Premium Features</h2>
          <p className="text-white/80 mb-6 max-w-2xl">
            Enhance your experience with our premium features including batch downloads, watermark removal, 
            cloud storage, and priority processing.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {/* Feature 1 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-md bg-white/20 flex items-center justify-center mr-3">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Batch Downloads</h3>
                <p className="text-white/70 text-sm">Download multiple videos simultaneously</p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-md bg-white/20 flex items-center justify-center mr-3">
                <Droplet className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Watermark Removal</h3>
                <p className="text-white/70 text-sm">Remove logos and watermarks from videos</p>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-md bg-white/20 flex items-center justify-center mr-3">
                <Cloud className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Cloud Storage</h3>
                <p className="text-white/70 text-sm">Store your videos in secure cloud storage</p>
              </div>
            </div>
          </div>
          
          <Link href="/auth">
            <Button className="bg-white text-primary hover:bg-gray-100 font-medium px-6 py-3 rounded-md transition-colors inline-flex items-center">
              <span>Get Premium</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PremiumFeatures;
