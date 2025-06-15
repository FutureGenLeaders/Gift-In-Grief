
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CtaSection() {
  const { t } = useTranslation();
  return (
    <section className="py-20 px-4 text-center bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-white">{t("cta.title").toString()}</h2>
        <p className="text-xl text-gray-300 mb-8">{t("cta.description").toString()}</p>
        <Link to="/assessment">
          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white px-12 py-4 text-lg"
          >
            {t("cta.button").toString()}
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
