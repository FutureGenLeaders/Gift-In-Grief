
import { Heart, Brain, Users, Compass } from "lucide-react";

export default function SolutionSection() {
  const solutions = [
    {
      icon: Heart,
      title: "Trauma-Informed Healing",
      description: "Gentle, evidence-based approaches that honor your emotional safety while promoting deep transformation."
    },
    {
      icon: Brain,
      title: "Emotional Intelligence",
      description: "Develop sophisticated emotional awareness and regulation skills that serve you for life."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with others who understand your journey while maintaining complete privacy and control."
    },
    {
      icon: Compass,
      title: "Ancient Wisdom Integration",
      description: "Time-tested healing practices combined with modern emotional science for comprehensive healing."
    }
  ];

  return (
    <section className="py-20 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 bg-gradient-to-r from-yellow-600 via-red-700 to-slate-300 bg-clip-text text-transparent">
            How We Transform Grief Into Wisdom
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive approach addresses grief as sacred transformation, not broken condition to be fixed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-yellow-600/50 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-red-700 rounded-lg p-3 mr-4">
                  <solution.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-light text-white">{solution.title}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
