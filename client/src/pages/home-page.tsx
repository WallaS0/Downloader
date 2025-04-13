import React from "react";
import Layout from "@/components/Layout";
import VideoDownloader from "@/components/VideoDownloader";
import FeatureCards from "@/components/FeatureCards";
import HowItWorks from "@/components/HowItWorks";
import PremiumFeatures from "@/components/PremiumFeatures";
import Faq from "@/components/Faq";

const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            Download Any Video in Your Preferred Quality
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Fast, easy, and secure video downloading from YouTube, TikTok, and more. 
            Choose your quality, format, and even remove watermarks.
          </p>
        </div>
      </section>

      {/* Main Downloader */}
      <VideoDownloader />
      
      {/* Features Section */}
      <FeatureCards />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Premium Features Section */}
      <PremiumFeatures />
      
      {/* FAQ Section */}
      <Faq />
    </Layout>
  );
};

export default HomePage;
