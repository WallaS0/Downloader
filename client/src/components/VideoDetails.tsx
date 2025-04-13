import React, { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FilmIcon, Music, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string | number;
  platform: string;
  formats: Array<{
    quality: string;
    size?: string;
    audioQuality?: string;
    itag?: number;
    mimeType?: string;
  }>;
}

interface VideoDetailsProps {
  videoInfo: VideoInfo;
  onDownload: (options: {
    quality?: string;
    format?: string;
    removeWatermark?: boolean;
    convertToMp3?: boolean;
    saveToHistory?: boolean;
  }) => void;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({ videoInfo, onDownload }) => {
  const [selectedQuality, setSelectedQuality] = useState<string | undefined>(undefined);
  const [selectedAudioQuality, setSelectedAudioQuality] = useState<string | undefined>(undefined);
  const [removeWatermark, setRemoveWatermark] = useState(false);
  const [convertToMp3, setConvertToMp3] = useState(false);
  const [saveToHistory, setSaveToHistory] = useState(true);
  const [advancedOptionsOpen, setAdvancedOptionsOpen] = useState(false);
  
  const { user } = useAuth();

  const formatDuration = (duration: string | number) => {
    if (typeof duration === 'number') {
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    return duration;
  };

  const videoFormats = videoInfo.formats.filter(format => 
    format.quality && format.quality !== 'audio only'
  );
  
  const audioFormats = videoInfo.formats.filter(format => 
    format.audioQuality || format.quality === 'audio only'
  );

  const handleDownload = (isAudio: boolean = false) => {
    onDownload({
      quality: isAudio ? selectedAudioQuality : selectedQuality,
      format: isAudio ? "audio" : "video",
      removeWatermark,
      convertToMp3: isAudio || convertToMp3,
      saveToHistory: user ? saveToHistory : false,
    });
  };

  return (
    <CardContent className="p-6 sm:p-8 bg-gray-50 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Video Thumbnail & Info */}
        <div className="sm:w-1/3">
          <div className="aspect-video bg-gray-200 rounded-md overflow-hidden relative">
            {videoInfo.thumbnail ? (
              <img 
                src={videoInfo.thumbnail} 
                alt={videoInfo.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-300">
                <FilmIcon className="h-12 w-12 text-gray-500" />
              </div>
            )}
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              {formatDuration(videoInfo.duration)}
            </div>
          </div>
          <h3 className="mt-3 font-medium line-clamp-2">{videoInfo.title}</h3>
          <p className="text-sm text-gray-600 mt-1 capitalize">{videoInfo.platform} video</p>
        </div>
        
        {/* Download Options */}
        <div className="sm:w-2/3">
          <h3 className="text-lg font-semibold mb-4">Download Options</h3>
          
          {/* Video Quality Options */}
          {videoFormats.length > 0 && (
            <div className="mb-5">
              <h4 className="font-medium text-gray-700 mb-2">Video</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {videoFormats.map((format, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`flex items-center justify-between h-auto py-3 px-4 border ${
                      selectedQuality === format.quality 
                        ? 'border-primary text-primary' 
                        : 'border-gray-300 text-gray-700'
                    }`}
                    onClick={() => setSelectedQuality(format.quality)}
                  >
                    <div className="flex items-center">
                      <FilmIcon className="h-5 w-5 mr-3 text-gray-500" />
                      <span>{format.quality}</span>
                    </div>
                    {format.size && (
                      <span className="text-sm text-gray-600">{
                        (parseInt(format.size) / (1024 * 1024)).toFixed(1)
                      } MB</span>
                    )}
                  </Button>
                ))}
              </div>
              
              <Button 
                className="w-full mt-3" 
                disabled={!selectedQuality}
                onClick={() => handleDownload(false)}
              >
                Download Video
              </Button>
            </div>
          )}
          
          {/* Audio Options */}
          {audioFormats.length > 0 && (
            <div className="mb-5">
              <Separator className="my-5" />
              <h4 className="font-medium text-gray-700 mb-2">Audio Only</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {audioFormats.slice(0, 2).map((format, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`flex items-center justify-between h-auto py-3 px-4 border ${
                      selectedAudioQuality === (format.audioQuality || format.quality) 
                        ? 'border-primary text-primary' 
                        : 'border-gray-300 text-gray-700'
                    }`}
                    onClick={() => setSelectedAudioQuality(format.audioQuality || format.quality)}
                  >
                    <div className="flex items-center">
                      <Music className="h-5 w-5 mr-3 text-gray-500" />
                      <span>{format.audioQuality || "High Quality"}</span>
                    </div>
                  </Button>
                ))}
              </div>
              
              <Button 
                className="w-full mt-3" 
                variant="outline"
                disabled={!selectedAudioQuality}
                onClick={() => handleDownload(true)}
              >
                Download Audio
              </Button>
            </div>
          )}
          
          {/* Advanced Options */}
          <div className="mt-4">
            <button
              className="flex items-center text-gray-700 hover:text-primary font-medium transition-colors"
              onClick={() => setAdvancedOptionsOpen(!advancedOptionsOpen)}
            >
              <span>Advanced Options</span>
              {advancedOptionsOpen ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </button>
            
            {advancedOptionsOpen && (
              <div className="mt-3 bg-gray-100 rounded-md p-4 space-y-3">
                <div className="flex items-center">
                  <Checkbox 
                    id="remove-watermark" 
                    checked={removeWatermark}
                    onCheckedChange={(checked) => setRemoveWatermark(checked === true)}
                  />
                  <label htmlFor="remove-watermark" className="ml-2 text-sm text-gray-700">
                    Remove watermark (when possible)
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox 
                    id="convert-mp3" 
                    checked={convertToMp3}
                    onCheckedChange={(checked) => setConvertToMp3(checked === true)}
                  />
                  <label htmlFor="convert-mp3" className="ml-2 text-sm text-gray-700">
                    Convert to MP3
                  </label>
                </div>
                {user && (
                  <div className="flex items-center">
                    <Checkbox 
                      id="save-history" 
                      checked={saveToHistory}
                      onCheckedChange={(checked) => setSaveToHistory(checked === true)}
                    />
                    <label htmlFor="save-history" className="ml-2 text-sm text-gray-700">
                      Save to download history
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </CardContent>
  );
};

export default VideoDetails;
