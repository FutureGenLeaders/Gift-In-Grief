
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Heart, Lotus, Star, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const pillars = [
    {
      icon: <Lotus className="h-8 w-8" />,
      title: "Buddhist Wisdom",
      description: "Understanding impermanence and the path through suffering to liberation",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Maat's Balance",
      description: "Truth, justice, and cosmic order in the face of loss and transformation",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Auset's Resurrection",
      description: "Divine feminine wisdom of death, rebirth, and eternal renewal",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <Sun className="h-8 w-8" />,
      title: "Christ Consciousness",
      description: "Unconditional love, forgiveness, and transcendence through sacred suffering",
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
              <Lotus className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Sacred Grief Journey
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/assessment" className="text-gray-300 hover:text-purple-400 transition-colors">
                Assessment
              </Link>
              <Link to="/sessions" className="text-gray-300 hover:text-purple-400 transition-colors">
                Daily Sessions
              </Link>
              <Link to="/masterclass" className="text-gray-300 hover:text-purple-400 transition-colors">
                Masterclasses
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
            <Lotus className="h-16 w-16 mx-auto text-purple-400 mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
              Sacred Grief Journey
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Transform your relationship with loss through ancient wisdom traditions.<br />
              <span className="text-purple-400">Buddhism • Maat • Auset • Christ Consciousness</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3">
              Begin Your Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
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
            Your Sacred Transformation Journey
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                  Sacred Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Discover where you are in your grief journey through the lens of ancient wisdom traditions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                  Daily Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Morning meditations, afternoon reflections, and evening integration sessions guided by sacred teachings.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                  Spiritual Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Deep masterclasses and community support to embody the wisdom of your transformation.
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
            Ready to Transform Your Grief into Sacred Wisdom?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands who have found peace, purpose, and profound healing through ancient spiritual practices.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg">
            Start Your Sacred Journey
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
