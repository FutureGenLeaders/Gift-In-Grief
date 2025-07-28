import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap } from 'lucide-react';

export default function Subscribe() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic",
      price: 29,
      description: "Essential healing resources for your journey",
      features: [
        "Access to core healing sessions",
        "Monthly guided meditations",
        "Basic progress tracking",
        "Community forum access",
        "Email support"
      ],
      icon: <Star className="h-6 w-6" />,
      featured: false
    },
    {
      name: "Premium",
      price: 59,
      description: "Complete healing transformation package",
      features: [
        "Everything in Basic",
        "Weekly 1-on-1 mentoring sessions",
        "Advanced healing curriculum",
        "Priority community access",
        "Live Q&A sessions",
        "Downloadable resources",
        "Phone & chat support"
      ],
      icon: <Crown className="h-6 w-6" />,
      featured: true
    },
    {
      name: "VIP",
      price: 97,
      description: "Premium healing with personalized support",
      features: [
        "Everything in Premium",
        "Daily personalized guidance",
        "Custom healing roadmap",
        "Private VIP community",
        "Direct mentor access",
        "Exclusive retreats & events",
        "24/7 priority support"
      ],
      icon: <Zap className="h-6 w-6" />,
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-[#D4AF37] mb-6">
            Choose Your Healing Journey
          </h1>
          <p className="text-lg font-['Inter'] text-[#C0C0C0] max-w-2xl mx-auto leading-relaxed">
            Select the plan that best supports your transformation. All plans include our core grief healing resources with varying levels of personalized support.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`relative bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 ${
                plan.featured ? 'border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)]' : ''
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-[#D4AF37] text-black px-4 py-2 font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="text-[#D4AF37]">
                    {plan.icon}
                  </div>
                </div>
                <CardTitle className="text-2xl font-['Playfair_Display'] text-[#D4AF37] mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-[#C0C0C0] font-['Inter']">/month</span>
                </div>
                <CardDescription className="font-['Inter'] text-[#C0C0C0] text-sm">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-['Inter'] text-[#C0C0C0]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full font-semibold py-3 transition-all duration-300 ${
                    plan.featured 
                      ? 'bg-[#D4AF37] text-black hover:bg-[#C0C0C0] transform hover:scale-105' 
                      : 'bg-[#D4AF37] text-black hover:bg-[#C0C0C0]'
                  }`}
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mb-12">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-[#C0C0C0] font-['Inter']">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-[#D4AF37]" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-[#D4AF37]" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-[#D4AF37]" />
              <span>Secure payment</span>
            </div>
          </div>
        </div>

        {/* Additional Support */}
        <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-[#D4AF37]/30 mb-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-['Playfair_Display'] text-[#D4AF37] mb-4">
              Need Help Choosing?
            </h3>
            <p className="font-['Inter'] text-[#C0C0C0] mb-6">
              Our healing specialists are here to help you find the perfect plan for your journey.
            </p>
            <Button 
              variant="outline" 
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
            >
              Schedule a Free Consultation
            </Button>
          </CardContent>
        </Card>

        {/* Return to Home */}
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-[#D4AF37] hover:text-[#C0C0C0] transition-colors duration-200 font-['Inter']"
          >
            ← Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}