
import { Compass, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleWatchDemo = () => {
    navigate("/masterclass");
  };

  return (
    <section className="relative py-20 px-6 text-center bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <Compass className="h-12 w-12 mx-auto text-yellow-600 mb-8 opacity-90" />
          <h1 className="text-3xl md:text-5xl font-light mb-8 bg-gradient-to-r from-yellow-600 via-red-700 to-slate-300 bg-clip-text text-transparent leading-tight tracking-wide">
            {t("hero.title")}
          </h1>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
              {t("hero.subtitle")}
            </p>
            <p className="text-lg md:text-xl text-yellow-600 font-light">
              {t("hero.subtitle2")}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link to="/assessment">
            <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white px-8 py-3 text-base font-light rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              {t("hero.startButton")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button
            onClick={handleWatchDemo}
            variant="outline"
            size="lg"
            className="border-yellow-600/60 text-yellow-600 hover:bg-yellow-600/10 px-8 py-3 text-base font-light rounded-full backdrop-blur-sm transition-all duration-300"
          >
            <Play className="mr-2 h-5 w-5" />
            {t("hero.watchButton")}
          </Button>
        </div>
      </div>
    </section>
  );
}
