
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Complete Grief Assessment",
      description: "Comprehensive evaluation covering 9 loss types and emotional patterns to understand your unique grief profile."
    },
    {
      number: "2", 
      title: "Receive Personalized Plan",
      description: "Get customized healing recommendations based on your specific grief pattern and emotional needs."
    },
    {
      number: "3",
      title: "Begin 2-Week Free Trial",
      description: "Full access to healing sessions, community support, and personalized guidance - no payment required."
    },
    {
      number: "4",
      title: "Transform Through 81 Sessions",
      description: "Progress through specialized sessions designed for your specific grief pattern and healing timeline."
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">
            Your Personalized Grief Transformation Journey
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A clear, gentle path from where you are now to where you want to be
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-red-700 rounded-full flex items-center justify-center text-white text-2xl font-light mb-6 mx-auto">
                {step.number}
              </div>
              <h3 className="text-xl font-light text-white mb-4">{step.title}</h3>
              <p className="text-gray-300 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/assessment">
            <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white px-12 py-4 text-lg">
              Start Your Healing Assessment
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
