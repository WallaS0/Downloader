import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const FAQ_ITEMS = [
  {
    question: "Is VideoGrab free to use?",
    answer: "VideoGrab offers both free and premium options. The basic features are completely free, including downloading videos from most platforms. Premium features like batch downloading, watermark removal, and cloud storage require a subscription."
  },
  {
    question: "What platforms are supported?",
    answer: "VideoGrab supports downloading from popular platforms including YouTube, TikTok, Facebook, Instagram, Twitter, Vimeo, and many more. We regularly add support for additional platforms."
  },
  {
    question: "Is it legal to download videos?",
    answer: "Downloading videos for personal use is generally allowed in many countries. However, redistributing copyrighted content or using it commercially without permission is illegal. Always respect copyright laws and the terms of service of the platforms you're downloading from."
  },
  {
    question: "How do I create an account?",
    answer: "Creating an account is simple. Click the \"Sign Up\" button in the top right corner, enter your email address and password, and follow the verification process. You can also sign up using your Google or Facebook account for quicker access."
  },
  {
    question: "What video quality options are available?",
    answer: "VideoGrab offers a wide range of quality options, from low-resolution to high-definition formats like 720p, 1080p, and even 4K when available. You can choose the quality that best suits your needs and internet connection."
  },
  {
    question: "Can I download only the audio from a video?",
    answer: "Yes, VideoGrab allows you to extract audio from videos and download it in MP3 format. This is perfect for music videos or when you only need the sound portion of a video."
  },
  {
    question: "How do I remove watermarks from videos?",
    answer: "VideoGrab offers a watermark removal feature that can remove watermarks from many videos. Simply check the 'Remove watermark' option in the advanced settings before downloading. Note that this feature works best with simple overlay watermarks and may not be 100% effective for all videos."
  },
  {
    question: "Is there a limit to how many videos I can download?",
    answer: "Free users can download individual videos without any daily limit. However, premium users get additional benefits like batch downloading, higher speeds, and priority processing for an enhanced experience."
  },
  {
    question: "Why is my download speed slow?",
    answer: "Download speed can be affected by various factors including your internet connection, server load, and the size of the video. Premium users get priority bandwidth allocation for faster downloads. If you're experiencing consistently slow speeds, try downloading at off-peak hours or check your internet connection."
  },
  {
    question: "How secure are my downloads?",
    answer: "VideoGrab takes security seriously. We use secure connections for all downloads, don't store your downloaded content on our servers, and protect your personal information with industry-standard security practices."
  },
  {
    question: "Can I download entire playlists or channels?",
    answer: "Batch downloading of playlists and channels is available as a premium feature. This allows you to download multiple videos simultaneously, saving you time and effort."
  },
  {
    question: "How do I save videos to my download history?",
    answer: "When you're logged in, your downloads are automatically saved to your history. You can also manually choose to save downloads to your history by checking the 'Save to download history' option in the advanced settings before downloading."
  }
];

const FaqPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <section className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Find answers to common questions about VideoGrab and how to use our video downloader effectively.
            </p>
          </div>
        </section>

        <Card className="mb-10">
          <CardHeader>
            <CardTitle>General Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-4">
              {FAQ_ITEMS.slice(0, 5).map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <AccordionTrigger className="py-4 px-6 hover:no-underline font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-2 border-t border-gray-200">
                    <p className="text-gray-600">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mb-10">
          <CardHeader>
            <CardTitle>Technical Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-4">
              {FAQ_ITEMS.slice(5, 9).map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`tech-item-${index}`}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <AccordionTrigger className="py-4 px-6 hover:no-underline font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-2 border-t border-gray-200">
                    <p className="text-gray-600">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Premium Features</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-4">
              {FAQ_ITEMS.slice(9).map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`premium-item-${index}`}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <AccordionTrigger className="py-4 px-6 hover:no-underline font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-2 border-t border-gray-200">
                    <p className="text-gray-600">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="bg-gray-50 rounded-xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            If you couldn't find the answer to your question, feel free to contact our support team. We're here to help!
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <a href="mailto:support@videograb.com">Contact Support</a>
            </Button>
            <Link href="/">
              <Button>Try VideoGrab Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FaqPage;
