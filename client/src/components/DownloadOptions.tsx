import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FilmIcon, Music, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface Format {
  quality: string;
  size?: string;
  audioQuality?: string;
  itag?: number;
  mimeType?: string;
}

interface DownloadOptionsProps {
  videoFormats: Format[];
  audioFormats: Format[];
  onDownload: (options: {
    quality?: string;
    format: string;
    removeWatermark: boolean;
    convertToMp3: boolean;
    saveToHistory: boolean;
  }) => void;
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({
  videoFormats,
  audioFormats,
  onDownload,
}) => {
  const [selectedQuality, setSelectedQuality] = useState<string | undefined>(
    videoFormats.length > 0 ? videoFormats[0].quality : undefined
  );
  const [selectedAudioQuality, setSelectedAudioQuality] = useState<string | undefined>(
    audioFormats.length > 0 ? audioFormats[0].quality || audioFormats[0].audioQuality : undefined
  );
  const [removeWatermark, setRemoveWatermark] = useState(false);
  const [convertToMp3, setConvertToMp3] = useState(false);
  const [saveToHistory, setSaveToHistory] = useState(true);
  const [advancedOptionsOpen, setAdvancedOptionsOpen] = useState(false);
  
  const { user } = useAuth();

  const handleDownloadVideo = () => {
    onDownload({
      quality: selectedQuality,
      format: "video",
      removeWatermark,
      convertToMp3: false,
      saveToHistory: user ? saveToHistory : false,
    });
  };

  const handleDownloadAudio = () => {
    onDownload({
      quality: selectedAudioQuality,
      format: "audio",
      removeWatermark,
      convertToMp3: true,
      saveToHistory: user ? saveToHistory : false,
    });
  };

  return (
    <div>
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
                className={`flex items-center justify-between h-auto py-3 px-4 ${
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
                  <span className="text-sm text-gray-600">
                    {(parseInt(format.size) / (1024 * 1024)).toFixed(1)} MB
                  </span>
                )}
              </Button>
            ))}
          </div>
          
          <Button 
            className="w-full mt-3" 
            disabled={!selectedQuality}
            onClick={handleDownloadVideo}
          >
            Download Video
          </Button>
        </div>
      )}
      
      {/* Audio Options */}
      {audioFormats.length > 0 && (
        <div className="mb-5">
          <h4 className="font-medium text-gray-700 mb-2">Audio Only</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {audioFormats.slice(0, 2).map((format, index) => (
              <Button
                key={index}
                variant="outline"
                className={`flex items-center justify-between h-auto py-3 px-4 ${
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
            onClick={handleDownloadAudio}
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
  );
};

export default DownloadOptions;
