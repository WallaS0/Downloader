import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
];

const Faq: React.FC = () => {
  return (
    <section className="mb-14 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      
      <Accordion type="single" collapsible className="space-y-4">
        {FAQ_ITEMS.map((item, index) => (
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
    </section>
  );
};

export default Faq;
