
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Briefcase, Shield, Cross, Star, Home, User, Compass } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LossTypesSection() {
  const { t } = useTranslation();

  const lossTypes = [
    {
      icon: Heart,
      title: t("lossTypes.safety"),
      key: "safety"
    },
    {
      icon: Users,
      title: t("lossTypes.relationship"),
      key: "relationship"
    },
    {
      icon: Briefcase,
      title: t("lossTypes.career"),
      key: "career"
    },
    {
      icon: Shield,
      title: t("lossTypes.health"),
      key: "health"
    },
    {
      icon: Cross,
      title: t("lossTypes.spiritual"),
      key: "spiritual"
    },
    {
      icon: Star,
      title: t("lossTypes.dreams"),
      key: "dreams"
    },
    {
      icon: Home,
      title: t("lossTypes.financial"),
      key: "financial"
    },
    {
      icon: User,
      title: t("lossTypes.identity"),
      key: "identity"
    },
    {
      icon: Compass,
      title: t("lossTypes.acceptance"),
      key: "acceptance"
    }
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light mb-6 bg-gradient-to-r from-yellow-600 via-red-700 to-slate-300 bg-clip-text text-transparent">
          {t("lossTypes.title")}
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Every loss is unique, but you're not alone. We understand the full spectrum of human loss and provide specialized support for each type.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {lossTypes.map((type, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-yellow-600/50 transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <type.icon className="h-6 w-6 text-yellow-600 group-hover:text-yellow-400 transition-colors" />
                <CardTitle className="text-white text-lg font-light group-hover:text-yellow-50 transition-colors">
                  {type.title}
                </CardTitle>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
