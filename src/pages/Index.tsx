
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Compass, Sun, Users, Briefcase, Home, TreePine, Sparkles, Sunrise, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/LanguageSelector";

const Index = () => {
  const { t } = useTranslation();

  const pillars = [
    {
      icon: <TreePine className="h-8 w-8" />,
      title: <span>{t('pillars.impermanence.title')}</span>,
      description: <span>{t('pillars.impermanence.description')}</span>,
      color: "from-amber-600 to-red-700"
    },
    {
      icon: <Compass className="h-8 w-8" />,
      title: <span>{t('pillars.truth.title')}</span>,
      description: <span>{t('pillars.truth.description')}</span>,
      color: "from-red-700 to-amber-600"
    },
    {
      icon: <Sun className="h-8 w-8" />,
      title: <span>{t('pillars.rebirth.title')}</span>,
      description: <span>{t('pillars.rebirth.description')}</span>,
      color: "from-amber-600 to-slate-400"
    },
    {
      icon: <Sun className="h-8 w-8" />,
      title: <span>{t('pillars.love.title')}</span>,
      description: <span>{t('pillars.love.description')}</span>,
      color: "from-red-700 to-amber-600"
    }
  ];

  const lossTypes = [
    { title: <span>{t('lossTypes.relationship')}</span>, icon: <Users className="h-6 w-6" />, color: "from-red-700 to-amber-600" },
    { title: <span>{t('lossTypes.career')}</span>, icon: <Briefcase className="h-6 w-6" />, color: "from-amber-600 to-red-700" },
    { title: <span>{t('lossTypes.financial')}</span>, icon: <Home className="h-6 w-6" />, color: "from-amber-600 to-slate-400" },
    { title: <span>{t('lossTypes.health')}</span>, icon: <TreePine className="h-6 w-6" />, color: "from-slate-400 to-red-700" },
    { title: <span>{t('lossTypes.spiritual')}</span>, icon: <Sparkles className="h-6 w-6" />, color: "from-red-700 to-slate-400" },
    { title: <span>{t('lossTypes.dreams')}</span>, icon: <Sunrise className="h-6 w-6" />, color: "from-amber-600 to-red-700" },
    { title: <span>{t('lossTypes.safety')}</span>, icon: <Shield className="h-6 w-6" />, color: "from-slate-500 to-black" },
    { title: <span>{t('lossTypes.identity')}</span>, icon: <Sparkles className="h-6 w-6" />, color: "from-slate-400 to-amber-600" },
    { title: <span>{t('lossTypes.acceptance')}</span>, icon: <TreePine className="h-6 w-6" />, color: "from-amber-600 to-slate-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/80 backdrop-blur-sm border-b border-yellow-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Compass className="h-8 w-8 text-yellow-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent">
                {t('app.title')}
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/assessment" className="text-gray-300 hover:text-yellow-600 transition-colors">
                <span>{t('nav.discovery')}</span>
              </Link>
              <Link to="/sessions" className="text-gray-300 hover:text-yellow-600 transition-colors">
                <span>{t('nav.practices')}</span>
              </Link>
              <Link to="/masterclass" className="text-gray-300 hover:text-yellow-600 transition-colors">
                <span>{t('nav.sessions')}</span>
              </Link>
              <Link to="/community" className="text-gray-300 hover:text-yellow-600 transition-colors">
                <span>{t('nav.community')}</span>
              </Link>
              <LanguageSelector />
              <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10">
                <span>{t('nav.signin')}</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Compass className="h-16 w-16 mx-auto text-yellow-600 mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-red-700 to-slate-300 bg-clip-text text-transparent">
              <span>{t('hero.title')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              {t('hero.subtitle')}<br />
              <span className="text-yellow-600">{t('hero.subtitle2')}</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/assessment">
              <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white px-8 py-3">
                <span>{t('hero.startButton')}</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10 px-8 py-3">
              <span>{t('hero.watchButton')}</span>
            </Button>
          </div>

          {/* 9 Faces of Loss */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent"><span>{t('lossTypes.title')}</span></h2>
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
        </div>
      </section>

      {/* Journey Overview */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent">
            <span>{t('journey.title')}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-r from-yellow-600 to-red-700 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                  <span>{t('journey.step1.title')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  <span>{t('journey.step1.description')}</span>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-r from-red-700 to-yellow-600 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                  <span>{t('journey.step2.title')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  <span>{t('journey.step2.description')}</span>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-r from-yellow-600 to-slate-400 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                  <span>{t('journey.step3.title')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  <span>{t('journey.step3.description')}</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-white">
            <span>{t('cta.title')}</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            <span>{t('cta.description')}</span>
          </p>
          <Link to="/assessment">
            <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white px-12 py-4 text-lg">
              <span>{t('cta.button')}</span>
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;

