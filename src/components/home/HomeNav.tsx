
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/LanguageSelector";

export default function HomeNav() {
  const { t } = useTranslation();
  return (
    <nav className="bg-black/80 backdrop-blur-sm border-b border-yellow-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Compass className="h-8 w-8 text-yellow-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent">
              {t("app.title").toString()}
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/assessment" className="text-gray-300 hover:text-yellow-600 transition-colors">
              {t("nav.discovery").toString()}
            </Link>
            <Link to="/sessions" className="text-gray-300 hover:text-yellow-600 transition-colors">
              {t("nav.practices").toString()}
            </Link>
            <Link to="/masterclass" className="text-gray-300 hover:text-yellow-600 transition-colors">
              {t("nav.sessions").toString()}
            </Link>
            <Link to="/community" className="text-gray-300 hover:text-yellow-600 transition-colors">
              {t("nav.community").toString()}
            </Link>
            <LanguageSelector />
            <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10">
              {t("nav.signin").toString()}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
