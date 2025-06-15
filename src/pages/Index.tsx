
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Heart, Flower2, Star, Sun, Compass } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const pillars = [
    {
      icon: <Flower2 className="h-8 w-8" />,
      title: "Sacred Impermanence",
      description: "Understanding the natural flow of life and finding peace in change",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Truth & Balance",
      description: "Seeking authentic understanding and cosmic order through life's challenges",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Death & Rebirth",
      description: "Embracing the sacred cycles of transformation and renewal",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <Sun className="h-8 w-8" />,
      title: "Unconditional Love",
      description: "Discovering the healing power of forgiveness and compassionate presence",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Flower2 className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Sacred Grief Journey
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/assessment" className="text-gray-300 hover:text-purple-400 transition-colors">
                Inner Discovery
              </Link>
              <Link to="/sessions" className="text-gray-300 hover:text-purple-400 transition-colors">
                Daily Practices
              </Link>
              <Link to="/masterclass" className="text-gray-300 hover:text-purple-400 transition-colors">
                Wisdom Sessions
              </Link>
              <Link to="/community" className="text-gray-300 hover:text-purple-400 transition-colors">
                Community
              </Link>
              <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Compass className="h-16 w-16 mx-auto text-purple-400 mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
              Sacred Grief Journey
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Transform your relationship with loss through your own inner wisdom.<br />
              <span className="text-purple-400">The roadmap is here. The guru is within you.</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/assessment">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3">
                Discover Your Path
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-3">
              Watch Introduction
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {pillars.map((pillar, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${pillar.color} p-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
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
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Inner Wisdom Awakening
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                  Inner Discovery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Discover where you are in your grief journey through gentle self-reflection and inner exploration.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                  Sacred Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Morning reflections, afternoon contemplations, and evening integrations that awaken your natural wisdom.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                  Truth Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Deep wisdom sessions and community support to embody the truth that emerges from within.
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
            Ready to Awaken Your Inner Wisdom?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            The roadmap is here. The answers are within you. Your transformation awaits your courage to look inside.
          </p>
          <Link to="/assessment">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg">
              Begin Your Inner Discovery
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
