
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { TreePine, Compass, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PillarsSection() {
  const { t } = useTranslation();
  const pillars = [
    {
      icon: <TreePine className="h-8 w-8" />,
      title: t('pillars.impermanence.title').toString(),
      description: t('pillars.impermanence.description').toString(),
      color: "from-amber-600 to-red-700"
    },
    {
      icon: <Compass className="h-8 w-8" />,
      title: t('pillars.truth.title').toString(),
      description: t('pillars.truth.description').toString(),
      color: "from-red-700 to-amber-600"
    },
    {
      icon: <Sun className="h-8 w-8" />,
      title: t('pillars.rebirth.title').toString(),
      description: t('pillars.rebirth.description').toString(),
      color: "from-amber-600 to-slate-400"
    },
    {
      icon: <Sun className="h-8 w-8" />,
      title: t('pillars.love.title').toString(),
      description: t('pillars.love.description').toString(),
      color: "from-red-700 to-amber-600"
    }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
      {pillars.map((pillar, index) => (
        <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-yellow-600/50 transition-all duration-300 group">
          <CardHeader className="text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${pillar.color} p-4 flex items-center justify-center group-hover:scale-110 transition-transform text-white`}>
              {pillar.icon}
            </div>
            <CardTitle className="text-white text-lg">{pillar.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-400 text-center">
              {pillar.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
