
import { Compass, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();
  return (
    <section className="relative py-20 px-4 text-center bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Compass className="h-16 w-16 mx-auto text-yellow-600 mb-6" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-red-700 to-slate-300 bg-clip-text text-transparent">
            {t("hero.title").toString()}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            {t("hero.subtitle").toString()}
            <br />
            <span className="text-yellow-600">{t("hero.subtitle2").toString()}</span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/assessment">
            <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white px-8 py-3">
              {t("hero.startButton").toString()}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10 px-8 py-3"
          >
            {t("hero.watchButton").toString()}
          </Button>
        </div>
      </div>
    </section>
  );
}
