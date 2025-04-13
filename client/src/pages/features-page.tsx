import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Download, 
  Globe, 
  Zap,
  Shield,
  FileVideo,
  Headphones,
  Droplet,
  Layers,
  Cloud,
  History,
  MenuSquare,
  Smartphone
} from "lucide-react";

const FeaturesPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Video Downloader Features
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              VideoGrab offers a wide range of powerful features to enhance your video downloading experience. Explore everything we have to offer.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Feature 1 */}
          <Card className="overflow-hidden">
            <div className="h-2 bg-primary"></div>
            <CardContent className="p-6 pt-6">
              <div className="flex items-start mb-4">
                <div className="rounded-full bg-primary/10 p-3 mr-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Multi-Platform Support</h3>
                  <p className="text-gray-600">
                    Download videos from YouTube, TikTok, Facebook, Instagram and many more platforms with a single tool.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="overflow-hidden">
            <div className="h-2 bg-primary"></div>
            <CardContent className="p-6 pt-6">
              <div className="flex items-start mb-4">
                <div className="rounded-full bg-primary/10 p-3 mr-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-gray-600">
                    Our optimized backend ensures rapid video processing and downloading without long wait times.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="overflow-hidden">
            <div className="h-2 bg-primary"></div>
            <CardContent className="p-6 pt-6">
              <div className="flex items-start mb-4">
                <div className="rounded-full bg-primary/10 p-3 mr-4">
                  <FileVideo className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Multiple Quality Options</h3>
                  <p className="text-gray-600">
                    Choose from various quality options including HD, Full HD, and 4K resolution to suit your needs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 4 */}
          <Card className="overflow-hidden">
            <div className="h-2 bg-primary"></div>
            <CardContent className="p-6 pt-6">
              <div className="flex items-start mb-4">
                <div className="rounded-full bg-primary/10 p-3 mr-4">
                  <Headphones className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Audio Extraction</h3>
                  <p className="text-gray-600">
                    Extract audio from videos in various bitrates and save as MP3 for your music library.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 5 */}
          <Card className="overflow-hidden">
            <div className="h-2 bg-primary"></div>
            <CardContent className="p-6 pt-6">
              <div className="flex items-start mb-4">
                <div className="rounded-full bg-primary/10 p-3 mr-4">
                  <Droplet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Watermark Removal</h3>
                  <p className="text-gray-600">
                    Remove annoying watermarks from downloaded videos for clean, professional-looking content.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 6 */}
          <Card className="overflow-hidden">
            <div className="h-2 bg-primary"></div>
            <CardContent className="p-6 pt-6">
              <div className="flex items-start mb-4">
                <div className="rounded-full bg-primary/10 p-3 mr-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                  <p className="text-gray-600">
                    Your downloads and personal information are kept secure with our privacy-focused approach.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 7 */}
          <Card className="overflow-hidden">
            <div className="h-2 bg-primary"></div>
            <CardContent className="p-6 pt-6">
              <div className="flex items-start mb-4">
                <div className="rounded-full bg-primary/10 p-3 mr-4">
                  <History className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Download History</h3>
                  <p className="text-gray-600">
                    Keep track of all your downloaded videos and easily access them again in your account.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 8 */}
          <Card className="overflow-hidden">
            <div className="h-2 bg-primary"></div>
            <CardContent className="p-6 pt-6">
              <div className="flex items-start mb-4">
                <div className="rounded-full bg-primary/10 p-3 mr-4">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
                  <p className="text-gray-600">
                    Access VideoGrab from any device with our fully responsive design that works on desktop, tablet and mobile.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="bg-gradient-to-r from-primary to-purple-600 rounded-xl overflow-hidden shadow-lg text-white mb-12">
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Premium Features</h2>
            <p className="text-white/80 mb-6 max-w-2xl">
              Upgrade to our premium plan to access exclusive features and enhance your video downloading experience.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-white/20 flex items-center justify-center mr-3">
                  <Layers className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Batch Downloads</h3>
                  <p className="text-white/70 text-sm">Download multiple videos simultaneously</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-white/20 flex items-center justify-center mr-3">
                  <MenuSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Playlist Support</h3>
                  <p className="text-white/70 text-sm">Download entire playlists with a single click</p>
                </div>
              </div>
              
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
        </section>

        <section className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Downloading?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Experience all these features and more with VideoGrab. Start downloading your favorite videos in just a few clicks.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="gap-2">
                <Download className="h-5 w-5" />
                Start Downloading
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="outline" size="lg">
                Create Account
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default FeaturesPage;
