
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Briefcase, Shield, Cross, Star, Home, User, Compass } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LossTypesSection() {
  const { t } = useTranslation();

  const lossTypes = [
    {
      icon: Heart,
      title: "Loss of Loved One",
      description: "Navigate the profound grief of losing someone precious through specialized emotional processing and meaning-making work.",
      key: "safety"
    },
    {
      icon: Users,
      title: "Loss of Relationship", 
      description: "Transform the pain of broken relationships into wisdom about love, boundaries, and personal growth.",
      key: "relationship"
    },
    {
      icon: Briefcase,
      title: "Loss of Career/Purpose",
      description: "Rebuild your professional identity and discover new meaning after job loss or career transitions.",
      key: "career"
    },
    {
      icon: Shield,
      title: "Loss of Health",
      description: "Adapt to physical limitations while maintaining dignity and finding new sources of vitality and purpose.",
      key: "health"
    },
    {
      icon: Cross,
      title: "Loss of Faith",
      description: "Navigate spiritual crisis and reconstruction with gentle exploration of meaning and belief systems.",
      key: "spiritual"
    },
    {
      icon: Star,
      title: "Loss of Dreams",
      description: "Process the grief of unfulfilled dreams while opening to new possibilities and life directions.",
      key: "dreams"
    },
    {
      icon: Home,
      title: "Financial Loss",
      description: "Rebuild security and self-worth after financial setbacks with practical and emotional support.",
      key: "financial"
    },
    {
      icon: User,
      title: "Loss of Identity",
      description: "Rediscover who you are after life transitions that shake your core sense of self.",
      key: "identity"
    },
    {
      icon: Compass,
      title: "Loss of Control",
      description: "Develop emotional sovereignty and inner stability when life feels chaotic and unpredictable.",
      key: "acceptance"
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-8 bg-gradient-to-r from-yellow-600 via-red-700 to-slate-300 bg-clip-text text-transparent">
            We Address Every Type of Loss
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Specialized healing approaches for each unique loss experience, because every grief journey deserves personalized support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lossTypes.map((type, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-yellow-600/50 transition-all duration-300 group h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <type.icon className="h-8 w-8 text-yellow-600 group-hover:text-yellow-400 transition-colors" />
                  <CardTitle className="text-white text-lg font-light group-hover:text-yellow-50 transition-colors">
                    {type.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {type.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
