import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Clipboard, 
  ArrowRight, 
  Download, 
  Settings, 
  CheckCircle,
  FileVideo,
  FileAudio
} from "lucide-react";

const HowItWorksPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              How VideoGrab Works
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Download videos from your favorite platforms in just a few simple steps.
              Here's everything you need to know about using VideoGrab.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <div className="grid grid-cols-1 gap-8">
            {/* Step 1 */}
            <Card className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-primary/10 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-semibold">Paste Video URL</h3>
                  </div>
                </div>
                <CardContent className="p-8 md:w-2/3">
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Start by finding the video you want to download on platforms like YouTube, TikTok, Facebook, or Instagram. 
                      Copy the video URL from the address bar of your browser.
                    </p>
                    <p className="text-gray-600">
                      Paste the URL into the input field on VideoGrab's homepage. You can either use Ctrl+V (Cmd+V on Mac) 
                      or click the paste icon to automatically grab the URL from your clipboard.
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 flex items-center">
                      <Clipboard className="h-5 w-5 text-gray-500 mr-3" />
                      <span className="text-gray-700">
                        <strong>Pro Tip:</strong> VideoGrab automatically detects the platform when you paste a URL.
                      </span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* Step 2 */}
            <Card className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-primary/10 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-semibold">Analyze Video</h3>
                  </div>
                </div>
                <CardContent className="p-8 md:w-2/3">
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Click the "Analyze" button to let VideoGrab fetch information about the video, including available quality options,
                      formats, and size. This process usually takes just a few seconds.
                    </p>
                    <p className="text-gray-600">
                      Once analyzed, you'll see a preview of the video including the thumbnail and title, confirming that you're
                      downloading the correct content.
                    </p>
                    <div className="flex items-center justify-center bg-gray-50 border border-gray-200 rounded-md p-6">
                      <Button className="gap-2" disabled>
                        <span>Analyzing</span>
                        <ArrowRight className="h-4 w-4 animate-pulse" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* Step 3 */}
            <Card className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-primary/10 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-semibold">Select Format</h3>
                  </div>
                </div>
                <CardContent className="p-8 md:w-2/3">
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Choose your preferred format and quality option. VideoGrab offers various video qualities from
                      360p to 4K (when available), as well as audio-only options.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center justify-between bg-white border border-gray-300 hover:border-primary rounded-md px-4 py-3">
                        <div className="flex items-center">
                          <FileVideo className="h-5 w-5 text-gray-500 mr-3" />
                          <span>1080p (Full HD)</span>
                        </div>
                        <span className="text-sm text-gray-600">149 MB</span>
                      </div>
                      <div className="flex items-center justify-between bg-white border border-gray-300 hover:border-primary rounded-md px-4 py-3">
                        <div className="flex items-center">
                          <FileAudio className="h-5 w-5 text-gray-500 mr-3" />
                          <span>MP3 (128 kbps)</span>
                        </div>
                        <span className="text-sm text-gray-600">4.8 MB</span>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      You can also access advanced options like watermark removal, MP3 conversion, and saving to your history
                      by clicking "Advanced Options".
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 flex items-center">
                      <Settings className="h-5 w-5 text-gray-500 mr-3" />
                      <span className="text-gray-700">
                        <strong>Pro Tip:</strong> Higher quality videos will have larger file sizes. Choose based on your needs.
                      </span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* Step 4 */}
            <Card className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-primary/10 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold">4</span>
                    </div>
                    <h3 className="text-xl font-semibold">Download</h3>
                  </div>
                </div>
                <CardContent className="p-8 md:w-2/3">
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Click the "Download" button to start the process. VideoGrab will process the video according to your selected
                      options and prepare it for download.
                    </p>
                    <p className="text-gray-600">
                      Wait for the processing to complete - you'll see a progress bar indicating the status. Once finished,
                      the download will start automatically and the file will be saved to your device's default download location.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-green-700">
                        <strong>Success:</strong> Your download is complete! The file has been saved to your device.
                      </span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Additional Features</h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">User Accounts</h3>
                    <p className="text-gray-600">
                      Create a free account to save your download history and access your videos later. This makes it easy to 
                      download the same videos again without needing to re-enter the URL.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Watermark Removal</h3>
                    <p className="text-gray-600">
                      Remove platform watermarks from your downloaded videos using our advanced processing technology. This is 
                      especially useful for TikTok and Instagram videos.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Multi-Platform Support</h3>
                    <p className="text-gray-600">
                      VideoGrab works with all major video platforms including YouTube, TikTok, Facebook, Instagram, Twitter, and more.
                      Just paste any video URL and let VideoGrab handle the rest.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Try It Yourself?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Now that you know how easy it is to use VideoGrab, why not try it out yourself? 
            Just paste a video URL and experience the simplicity of downloading videos in your preferred quality.
          </p>
          <Link href="/">
            <Button size="lg" className="gap-2">
              <Download className="h-5 w-5" />
              Start Downloading
            </Button>
          </Link>
        </section>
      </div>
    </Layout>
  );
};

export default HowItWorksPage;
