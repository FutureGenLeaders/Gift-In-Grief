
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
    <section className="relative py-24 px-6 text-center bg-black min-h-[90vh] flex items-center">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-16">
          <Compass className="h-16 w-16 mx-auto text-yellow-600 mb-10 opacity-90" />
          
          <h1 className="text-4xl md:text-7xl font-light mb-10 bg-gradient-to-r from-yellow-600 via-red-700 to-slate-300 bg-clip-text text-transparent leading-tight tracking-wide">
            Transform Your Grief Into Wisdom and Strength
          </h1>
          
          <div className="max-w-4xl mx-auto space-y-6 mb-12">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
              Navigate loss with dignity, heal with purpose, and emerge more powerful than before.
            </p>
            <p className="text-xl md:text-2xl text-yellow-600 font-light">
              Our trauma-informed platform guides you through 9 types of loss using ancient wisdom and modern emotional science.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
          <Link to="/assessment">
            <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white px-12 py-4 text-lg font-light rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Start Your Healing Assessment
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
          
          <Button
            onClick={handleWatchDemo}
            variant="outline"
            size="lg"
            className="border-yellow-600/60 text-yellow-600 hover:bg-yellow-600/10 px-12 py-4 text-lg font-light rounded-full backdrop-blur-sm transition-all duration-300 hover:border-yellow-500"
          >
            <Play className="mr-3 h-6 w-6" />
            Explore Healing Approach
          </Button>
        </div>

        <p className="text-gray-400 text-lg">
          Free assessment • Personalized recommendations • 2-week trial included
        </p>
      </div>
    </section>
  );
}
