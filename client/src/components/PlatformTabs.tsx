import React from "react";
import {
  FaYoutube,
  FaTiktok,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaVimeo,
  FaDailymotion,
  FaReddit,
  FaTwitch
} from "react-icons/fa";
import { SiRumble } from "react-icons/si";
import { Badge } from "@/components/ui/badge";

interface PlatformTabsProps {
  selectedPlatform: string;
  onSelectPlatform: (platform: string) => void;
}

const PlatformTabs: React.FC<PlatformTabsProps> = ({ selectedPlatform, onSelectPlatform }) => {
  const platforms = [
    { id: "youtube", name: "YouTube", icon: <FaYoutube className="text-red-600" /> },
    { id: "tiktok", name: "TikTok", icon: <FaTiktok /> },
    { id: "facebook", name: "Facebook", icon: <FaFacebook className="text-blue-600" /> },
    { id: "instagram", name: "Instagram", icon: <FaInstagram className="text-pink-600" /> },
    { id: "twitter", name: "Twitter", icon: <FaTwitter className="text-blue-400" />, badge: "New" },
    { id: "linkedin", name: "LinkedIn", icon: <FaLinkedin className="text-blue-700" />, badge: "New" },
    { id: "vimeo", name: "Vimeo", icon: <FaVimeo className="text-cyan-600" />, badge: "New" },
    { id: "dailymotion", name: "Dailymotion", icon: <FaDailymotion className="text-blue-500" />, badge: "New" },
    { id: "reddit", name: "Reddit", icon: <FaReddit className="text-orange-600" />, badge: "New" },
    { id: "twitch", name: "Twitch", icon: <FaTwitch className="text-purple-600" />, badge: "New" },
    { id: "rumble", name: "Rumble", icon: <SiRumble className="text-green-600" />, badge: "New" }
  ];

  return (
    <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-800 mb-5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
      {platforms.map((platform) => (
        <button
          key={platform.id}
          className={`flex items-center py-2 px-4 rounded-t-md font-medium transition-all duration-200 relative ${
            selectedPlatform === platform.id 
              ? "bg-primary/10 text-primary border-b-2 border-primary" 
              : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
          }`}
          onClick={() => onSelectPlatform(platform.id)}
        >
          <span className="mr-2 text-lg">{platform.icon}</span>
          <span>{platform.name}</span>
          {platform.badge && (
            <Badge variant="outline" className="ml-2 text-[10px] bg-green-500 text-white border-0 py-0 px-1 absolute -top-1 -right-1">
              {platform.badge}
            </Badge>
          )}
        </button>
      ))}
    </div>
  );
};

export default PlatformTabs;
