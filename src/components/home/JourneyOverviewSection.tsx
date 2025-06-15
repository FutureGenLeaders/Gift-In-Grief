import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function JourneyOverviewSection() {
  const { t } = useTranslation();
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent">
          {t("journey.title").toString()}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-yellow-600 to-red-700 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                {t("journey.step1.title").toString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">{t("journey.step1.description").toString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-red-700 to-yellow-600 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                {t("journey.step2.title").toString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">{t("journey.step2.description").toString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-yellow-600 to-slate-400 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                {t("journey.step3.title").toString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">{t("journey.step3.description").toString()}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
