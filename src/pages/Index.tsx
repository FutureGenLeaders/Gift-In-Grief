
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Heart, Flower2, Star, Sun, Compass, Users, Briefcase, Home, Leaf, Sparkles, Sunrise, Shield, Butterfly, TreePine } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const pillars = [
    {
      icon: <Flower2 className="h-8 w-8" />,
      title: "Impermanence",
      description: "Understanding the natural flow of life and finding peace in change",
      color: "from-yellow-600 to-red-700"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Truth & Balance",
      description: "Seeking authentic understanding and cosmic order through life's challenges",
      color: "from-red-700 to-yellow-600"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Death & Rebirth",
      description: "Embracing the sacred cycles of transformation and renewal",
      color: "from-yellow-600 to-slate-400"
    },
    {
      icon: <Sun className="h-8 w-8" />,
      title: "Unconditional Love",
      description: "Discovering the healing power of forgiveness and compassionate presence",
      color: "from-red-700 to-yellow-600"
    }
  ];

  const lossTypes = [
    { title: "Loss of Relationship", icon: <Users className="h-6 w-6" />, color: "from-red-700 to-yellow-600" },
    { title: "Loss of Career/Purpose", icon: <Briefcase className="h-6 w-6" />, color: "from-yellow-600 to-red-700" },
    { title: "Loss of Financial Security", icon: <Home className="h-6 w-6" />, color: "from-yellow-600 to-slate-400" },
    { title: "Loss of Health", icon: <Leaf className="h-6 w-6" />, color: "from-slate-400 to-red-700" },
    { title: "Loss of Spiritual Identity", icon: <Sparkles className="h-6 w-6" />, color: "from-red-700 to-slate-400" },
    { title: "Loss of Dreams/Future", icon: <Sunrise className="h-6 w-6" />, color: "from-yellow-600 to-red-700" },
    { title: "Loss of Safety/Security", icon: <Shield className="h-6 w-6" />, color: "from-slate-500 to-black" },
    { title: "Loss of Identity/Role", icon: <Butterfly className="h-6 w-6" />, color: "from-slate-400 to-yellow-600" },
    { title: "Radical Acceptance", icon: <TreePine className="h-6 w-6" />, color: "from-yellow-600 to-slate-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/80 backdrop-blur-sm border-b border-yellow-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-yellow-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent">
                The Gift in Grief
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/assessment" className="text-gray-300 hover:text-yellow-600 transition-colors">
                Inner Discovery
              </Link>
              <Link to="/sessions" className="text-gray-300 hover:text-yellow-600 transition-colors">
                Daily Practices
              </Link>
              <Link to="/masterclass" className="text-gray-300 hover:text-yellow-600 transition-colors">
                Wisdom Sessions
              </Link>
              <Link to="/community" className="text-gray-300 hover:text-yellow-600 transition-colors">
                Community
              </Link>
              <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10">
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
            <Heart className="h-16 w-16 mx-auto text-yellow-600 mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-red-700 to-slate-300 bg-clip-text text-transparent">
              The Gift in Grief
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Transform your relationship with loss through gentle wisdom and compassionate support.<br />
              <span className="text-yellow-600">The roadmap is here. The healing is within you.</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/assessment">
              <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white px-8 py-3">
                Begin Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10 px-8 py-3">
              Watch Introduction
            </Button>
          </div>

          {/* 9 Faces of Loss */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent">The 9 Faces of Loss</h2>
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
            Your Gentle Healing Journey
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-r from-yellow-600 to-red-700 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                  Gentle Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Discover where you are in your grief journey through compassionate self-reflection and gentle exploration.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-r from-red-700 to-yellow-600 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                  Daily Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Morning check-ins, afternoon reflections, and evening integrations that nurture your natural healing wisdom.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-r from-yellow-600 to-slate-400 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                  Community Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Connect with others on similar journeys and access professional resources when you're ready.
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
            Ready to Discover the Gift in Your Grief?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Your healing journey is unique. Let us provide gentle guidance as you uncover the wisdom and strength within your experience.
          </p>
          <Link to="/assessment">
            <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white px-12 py-4 text-lg">
              Begin Your Gentle Journey
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
