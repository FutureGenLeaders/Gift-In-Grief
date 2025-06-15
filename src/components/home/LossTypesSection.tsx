
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Users, Briefcase, Home, TreePine, Sparkles, Sunrise, Shield } from "lucide-react";

export default function LossTypesSection() {
  const { t } = useTranslation();
  const lossTypes = [
    { title: t("lossTypes.relationship").toString(), icon: <Users className="h-6 w-6" />, color: "from-red-700 to-amber-600" },
    { title: t("lossTypes.career").toString(), icon: <Briefcase className="h-6 w-6" />, color: "from-amber-600 to-red-700" },
    { title: t("lossTypes.financial").toString(), icon: <Home className="h-6 w-6" />, color: "from-amber-600 to-slate-400" },
    { title: t("lossTypes.health").toString(), icon: <TreePine className="h-6 w-6" />, color: "from-slate-400 to-red-700" },
    { title: t("lossTypes.spiritual").toString(), icon: <Sparkles className="h-6 w-6" />, color: "from-red-700 to-slate-400" },
    { title: t("lossTypes.dreams").toString(), icon: <Sunrise className="h-6 w-6" />, color: "from-amber-600 to-red-700" },
    { title: t("lossTypes.safety").toString(), icon: <Shield className="h-6 w-6" />, color: "from-slate-500 to-black" },
    { title: t("lossTypes.identity").toString(), icon: <Sparkles className="h-6 w-6" />, color: "from-slate-400 to-amber-600" },
    { title: t("lossTypes.acceptance").toString(), icon: <TreePine className="h-6 w-6" />, color: "from-amber-600 to-slate-500" },
  ];
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent">
        {t("lossTypes.title").toString()}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {lossTypes.map((loss, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-yellow-600/50 transition-all duration-300 group">
            <CardHeader className="text-center pb-3">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${loss.color} p-3 flex items-center justify-center group-hover:scale-110 transition-transform text-white`}>
                {loss.icon}
              </div>
              <CardTitle className="text-white text-sm">{loss.title}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
