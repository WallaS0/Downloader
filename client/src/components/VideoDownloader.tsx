import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PlatformTabs from "./PlatformTabs";
import VideoDetails from "./VideoDetails";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Clipboard, 
  Sparkles, 
  Download,
  Video,
  Music,
  Layers
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string;
  platform: string;
  formats: Array<{
    quality: string;
    size?: string;
    audioQuality?: string;
    itag?: number;
    mimeType?: string;
  }>;
}

const VideoDownloader: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("youtube");
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState("30 seconds");
  const { toast } = useToast();

  const videoInfoMutation = useMutation({
    mutationFn: async (data: { url: string; platform: string }) => {
      const res = await apiRequest("POST", "/api/video/info", data);
      return res.json();
    },
    onSuccess: (data) => {
      setVideoInfo(data);
      toast({
        title: "Video found!",
        description: `Successfully found: ${data.title}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error finding video",
        description: error.message,
        variant: "destructive",
      });
      setVideoInfo(null);
    },
  });

  const downloadMutation = useMutation({
    mutationFn: async (options: {
      videoUrl: string;
      quality?: string;
      format?: string;
      removeWatermark?: boolean;
      convertToMp3?: boolean;
      saveToHistory?: boolean;
    }) => {
      // Start processing animation
      setIsProcessing(true);
      simulateProgress();
      
      const res = await apiRequest("POST", "/api/video/download", options);
      const blob = await res.blob();
      return blob;
    },
    onSuccess: (blob) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `videograb-${Date.now()}.${blob.type.includes("audio") ? "mp3" : "mp4"}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      setIsProcessing(false);
      setProgress(0);
      
      toast({
        title: "Download complete!",
        description: "Your video has been downloaded successfully.",
      });
    },
    onError: (error: Error) => {
      setIsProcessing(false);
      setProgress(0);
      
      toast({
        title: "Download failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAnalyzeUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) {
      toast({
        title: "Error",
        description: "Please enter a video URL",
        variant: "destructive",
      });
      return;
    }

    videoInfoMutation.mutate({
      url: videoUrl,
      platform: selectedPlatform,
    });
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setVideoUrl(text);
      
      // Auto-detect platform
      if (text.includes("youtube.com") || text.includes("youtu.be")) {
        setSelectedPlatform("youtube");
      } else if (text.includes("tiktok.com")) {
        setSelectedPlatform("tiktok");
      } else if (text.includes("facebook.com")) {
        setSelectedPlatform("facebook");
      } else if (text.includes("instagram.com")) {
        setSelectedPlatform("instagram");
      }
      
      toast({
        title: "URL pasted",
        description: "Video URL pasted from clipboard",
      });
    } catch (err) {
      toast({
        title: "Clipboard access denied",
        description: "Could not access clipboard",
        variant: "destructive",
      });
    }
  };

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);
    
    const timeEstimationInterval = setInterval(() => {
      setEstimatedTime((prev) => {
        const seconds = parseInt(prev.split(" ")[0]);
        const newSeconds = Math.max(5, seconds - 5);
        return `${newSeconds} seconds`;
      });
    }, 5000);
    
    // Clean up if component unmounts
    return () => {
      clearInterval(interval);
      clearInterval(timeEstimationInterval);
    };
  };

  const isValidUrl = (url: string) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const autoDetectedPlatform = () => {
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      return "YouTube";
    } else if (videoUrl.includes("tiktok.com")) {
      return "TikTok";
    } else if (videoUrl.includes("facebook.com")) {
      return "Facebook";
    } else if (videoUrl.includes("instagram.com")) {
      return "Instagram";
    }
    return null;
  };

  useEffect(() => {
    // Auto-detect platform when URL changes
    if (videoUrl) {
      if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
        setSelectedPlatform("youtube");
      } else if (videoUrl.includes("tiktok.com")) {
        setSelectedPlatform("tiktok");
      } else if (videoUrl.includes("facebook.com")) {
        setSelectedPlatform("facebook");
      } else if (videoUrl.includes("instagram.com")) {
        setSelectedPlatform("instagram");
      }
    }
  }, [videoUrl]);

  return (
    <Card className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden mb-12 max-w-4xl mx-auto border border-gray-200 dark:border-gray-800 card-hover">
      {/* URL Input Section */}
      <CardHeader className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-800 relative">
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="bg-gradient-to-r from-primary to-purple-500 text-white border-0 px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            Pro
          </Badge>
        </div>
        
        <CardTitle className="text-3xl font-bold mb-2 gradient-heading">
          Reel Grab Video
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400 mb-6">
          Download videos from YouTube, TikTok, Instagram, Facebook and more!
        </CardDescription>
        
        <PlatformTabs 
          selectedPlatform={selectedPlatform} 
          onSelectPlatform={setSelectedPlatform} 
        />
        
        <form className="relative" onSubmit={handleAnalyzeUrl}>
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <Input 
                type="text" 
                placeholder="Paste video URL here" 
                className="pl-10 pr-12 py-6 focus:ring-2 focus:ring-primary/20 transition-all"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <div 
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={handlePasteFromClipboard}
              >
                <Clipboard className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" />
              </div>
            </div>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-primary to-purple-600 hover:shadow-lg hover:shadow-primary/20 text-white font-medium py-6 px-6 rounded-md transition-all duration-300 flex items-center justify-center button-glow"
              disabled={videoInfoMutation.isPending || !isValidUrl(videoUrl)}
            >
              {videoInfoMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <span>Analyze</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
          
          {/* URL Auto-Detection Banner */}
          {isValidUrl(videoUrl) && autoDetectedPlatform() && (
            <div className="mt-3 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 px-4 py-3 rounded-md flex items-center text-sm">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              <span>URL detected! We found a {autoDetectedPlatform()} video. Click analyze to continue.</span>
            </div>
          )}
        </form>
      </CardHeader>
      
      {/* Video Found Result */}
      {videoInfo && !isProcessing && (
        <VideoDetails 
          videoInfo={videoInfo} 
          onDownload={(options) => {
            downloadMutation.mutate({
              videoUrl,
              ...options,
            });
          }}
        />
      )}
      
      {/* Processing/Downloading Section */}
      {isProcessing && (
        <CardContent className="p-6 sm:p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Processing Your Video</h3>
            <p className="text-gray-600 mb-4">Please wait while we prepare your download.</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 max-w-md mx-auto">
              <Progress value={progress} className="h-2.5" />
            </div>
            <p className="text-sm text-gray-500">Estimated time: <span>{estimatedTime}</span></p>
          </div>
        </CardContent>
      )}
      
      {/* Error State */}
      {videoInfoMutation.isError && !videoInfo && (
        <CardContent className="p-6 sm:p-8 bg-red-50 border-t border-red-200">
          <div className="flex items-center mb-2">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="text-lg font-semibold text-red-700">Error Finding Video</h3>
          </div>
          <p className="text-red-600">
            We couldn't find a valid video at the URL you provided. Please check the URL and try again.
          </p>
        </CardContent>
      )}
    </Card>
  );
};

export default VideoDownloader;
