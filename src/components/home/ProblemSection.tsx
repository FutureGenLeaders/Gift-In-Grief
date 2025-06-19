
import { X, Check } from "lucide-react";

export default function ProblemSection() {
  const problems = [
    "Feeling lost and disconnected after loss",
    "Overwhelmed by emotions you can't control",
    "Unsure how to move forward with meaning",
    "Isolated in your grief journey"
  ];

  const solutions = [
    "Transform pain into purpose and wisdom",
    "Develop emotional sovereignty and resilience", 
    "Create new meaning from loss experience",
    "Connect with others on healing journey"
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">
            You Don't Have to Suffer Alone in Silence
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Problems */}
          <div className="space-y-6">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-start space-x-4">
                <X className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-lg leading-relaxed">{problem}</p>
              </div>
            ))}
          </div>

          {/* Solutions */}
          <div className="space-y-6">
            {solutions.map((solution, index) => (
              <div key={index} className="flex items-start space-x-4">
                <Check className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-lg leading-relaxed">{solution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
