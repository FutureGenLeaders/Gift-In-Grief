import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function Subscribe() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const plans = [
    {
      name: "Gentle Beginning",
      tier: "Basic",
      price: 33,
      description: "Start your healing journey with gentle, weekly guidance delivered at a sustainable pace for lasting transformation.",
      features: [
        "1 healing session delivered weekly",
        "Group healing circles for community support",
        "Foundation community access",
        "Mobile healing companion"
      ],
      icon: <Star className="h-6 w-6" />,
      featured: false
    },
    {
      name: "Guided Journey",
      tier: "Complete",
      price: 88,
      description: "Experience deeper healing with 40 sessions dripped weekly over 9 months, delivered at your perfect healing pace.",
      features: [
        "40 healing sessions dripped weekly over 9 months",
        "1 mindfulness mentoring session monthly",
        "All healing circles and community features",
        "Enhanced progress tracking",
        "Priority community access"
      ],
      icon: <Crown className="h-6 w-6" />,
      featured: true
    },
    {
      name: "Sacred Transformation",
      tier: "Transformation",
      price: 111,
      description: "Embrace your complete transformation with 81 sessions delivered weekly over 20+ months for profound, lasting change.",
      features: [
        "81 healing sessions delivered weekly over 20+ months",
        "2 mindfulness mentoring sessions monthly",
        "All premium healing features",
        "Advanced transformation tools",
        "Sacred circle priority support",
        "Exclusive transformation community"
      ],
      icon: <Zap className="h-6 w-6" />,
      featured: false
    }
  ];

  const handleSubscribe = async (planTier: string) => {
    try {
      setIsLoading(planTier);
      
      console.log('Starting checkout for tier:', planTier);
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          tier: planTier,
          email: "guest@example.com" // Guest checkout
        }
      });

      console.log('Checkout response:', { data, error });

      if (error) {
        console.error('Checkout error:', error);
        toast({
          title: "Payment Error",
          description: error.message || "Failed to create checkout session. Please try again.",
          variant: "destructive"
        });
        return;
      }

      if (data?.url) {
        console.log('Redirecting to Stripe checkout:', data.url);
        // Redirect to Stripe checkout in the same tab
        window.location.href = data.url;
      } else {
        console.error('No checkout URL received:', data);
        toast({
          title: "Error",
          description: "No checkout URL received from payment system. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Error", 
        description: "Something went wrong with the payment system. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl luxury-heading font-bold mb-6">
            Join Our Healing Community
          </h1>
          <p className="text-lg luxury-text max-w-2xl mx-auto leading-relaxed">
            All subscriptions include community support and a 14-day free trial.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`relative bg-card border-border hover:bg-muted transition-all duration-300 hover:scale-105 ${
                plan.featured ? 'border-primary shadow-[0_0_30px_hsl(var(--primary)/0.3)]' : ''
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-2 font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="text-primary">
                    {plan.icon}
                  </div>
                </div>
                <CardTitle className="text-2xl luxury-heading mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription className="luxury-text text-sm leading-relaxed">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm luxury-text">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => handleSubscribe(plan.tier)}
                  disabled={isLoading === plan.tier}
                  variant={plan.featured ? "default" : "outline"}
                  className="w-full font-semibold py-3"
                >
                  {isLoading === plan.tier ? 'Processing...' : 'Start 14-Day Free Trial'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mb-12">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 luxury-text">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Secure payment</span>
            </div>
          </div>
        </div>

        {/* Return to Home */}
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:text-secondary transition-colors duration-200 luxury-text"
          >
            ← Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}