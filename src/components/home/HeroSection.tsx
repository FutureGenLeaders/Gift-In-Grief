
import { Compass, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();
  return (
    <section className="relative py-24 px-6 text-center bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <Compass className="h-12 w-12 mx-auto text-yellow-600 mb-8 opacity-90" />
          <h1 className="text-4xl md:text-6xl font-light mb-8 bg-gradient-to-r from-yellow-600 via-red-700 to-slate-300 bg-clip-text text-transparent leading-tight tracking-wide">
            {t("hero.title").toString()}
          </h1>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
              {t("hero.subtitle").toString()}
            </p>
            <p className="text-lg md:text-xl text-yellow-600 font-medium">
              {t("hero.subtitle2").toString()}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link to="/assessment">
            <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white px-10 py-4 text-base font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              {t("hero.startButton").toString()}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="border-yellow-600/60 text-yellow-600 hover:bg-yellow-600/10 px-10 py-4 text-base font-medium rounded-full backdrop-blur-sm transition-all duration-300"
          >
            {t("hero.watchButton").toString()}
          </Button>
        </div>
      </div>
    </section>
  );
}
