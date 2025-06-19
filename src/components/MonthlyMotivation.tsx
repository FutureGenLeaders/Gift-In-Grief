
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Quote, Heart, Sparkles } from "lucide-react";

interface MonthlyMessage {
  month: string;
  title: string;
  message: string;
  action: string;
  theme: string;
}

// Monthly grief healing and emotional sovereignty messages
const monthlyMessages: MonthlyMessage[] = [
  {
    month: "January",
    title: "New Beginnings in Grief",
    message: "This month, we honor that healing doesn't mean forgetting. Your grief is sacred, and your journey toward emotional sovereignty begins with gentle self-compassion.",
    action: "Practice daily emotional check-ins",
    theme: "Gentle Beginnings"
  },
  {
    month: "February", 
    title: "Love Through Loss", 
    message: "February reminds us that love continues beyond loss. Your capacity to love - yourself and others - is not diminished by grief but transformed by it.",
    action: "Write a love letter to yourself",
    theme: "Continuing Love"
  },
  {
    month: "March",
    title: "Courage to Feel",
    message: "Spring teaches us about renewal. This month, find courage to feel your emotions fully, knowing that each feeling you honor moves you closer to wisdom.",
    action: "Embrace one difficult emotion daily",
    theme: "Emotional Courage"
  },
  {
    month: "April",
    title: "Growth Through Grief",
    message: "Like flowers pushing through soil, your healing breaks through the darkness of loss. Trust the process of your transformation.",
    action: "Document three ways you've grown",
    theme: "Sacred Growth"
  },
  {
    month: "May",
    title: "Blooming Wisdom",
    message: "Your grief is becoming wisdom. This month, notice how your pain is transforming into compassion, your loss into love, your suffering into service.",
    action: "Share your wisdom with another",
    theme: "Emerging Wisdom"
  },
  {
    month: "June",
    title: "Light in Darkness",
    message: "Summer solstice reminds us that even in our darkest grief, light remains. Your healing illuminates the path for others walking similar journeys.",
    action: "Be a light for someone else",
    theme: "Inner Light"
  },
  {
    month: "July",
    title: "Independence Day",
    message: "True emotional sovereignty comes from within. This month, celebrate your independence from being defined by your loss while honoring its sacred teachings.",
    action: "Practice emotional self-reliance",
    theme: "Emotional Freedom"
  },
  {
    month: "August",
    title: "Harvest of Healing",
    message: "You are harvesting the fruits of your grief work. Notice the strength, compassion, and wisdom that have grown from your willingness to heal consciously.",
    action: "Celebrate your healing progress",
    theme: "Healing Harvest"
  },
  {
    month: "September",
    title: "Wisdom Season",
    message: "Autumn teaches us about letting go with grace. Your grief has taught you the art of release while keeping love alive in your heart.",
    action: "Practice conscious letting go",
    theme: "Graceful Release"
  },
  {
    month: "October",
    title: "Transformation Magic",
    message: "Like leaves changing colors, your grief has transformed you into someone more beautiful, wise, and compassionate. Your transformation is sacred magic.",
    action: "Honor your transformation",
    theme: "Sacred Change"
  },
  {
    month: "November",
    title: "Gratitude in Grief",
    message: "Even in loss, gratitude can coexist with sorrow. This month, practice being grateful for your capacity to love so deeply that loss matters.",
    action: "Find gratitude within grief",
    theme: "Grateful Heart"
  },
  {
    month: "December",
    title: "Light in Winter",
    message: "In the darkest season, we remember that light always returns. Your grief journey has prepared you to be a beacon of hope for others.",
    action: "Share your light with the world",
    theme: "Beacon of Hope"
  }
];

export default function MonthlyMotivation() {
  const [currentMessage, setCurrentMessage] = useState<MonthlyMessage | null>(null);

  useEffect(() => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const message = monthlyMessages.find(m => m.month === currentMonth);
    setCurrentMessage(message || monthlyMessages[0]);
  }, []);

  if (!currentMessage) return null;

  return (
    <Card className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-700 w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center font-light">
            <Calendar className="h-5 w-5 text-yellow-600 mr-2" />
            {currentMessage.month} Healing Message
          </CardTitle>
          <Sparkles className="h-5 w-5 text-yellow-600" />
        </div>
        <div className="bg-yellow-600/10 rounded-lg px-3 py-1 w-fit">
          <span className="text-yellow-600 text-sm font-light">{currentMessage.theme}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-light text-yellow-300 mb-3">{currentMessage.title}</h3>
          <div className="relative">
            <Quote className="h-4 w-4 text-yellow-600/50 absolute -top-1 -left-1" />
            <p className="text-gray-300 font-light leading-relaxed pl-4 italic">
              {currentMessage.message}
            </p>
          </div>
        </div>
        
        <div className="bg-slate-700/30 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Heart className="h-4 w-4 text-yellow-600 mr-2" />
            <span className="text-yellow-600 font-medium text-sm">This Month's Healing Practice</span>
          </div>
          <p className="text-gray-300 text-sm font-light">{currentMessage.action}</p>
        </div>
      </CardContent>
    </Card>
  );
}
