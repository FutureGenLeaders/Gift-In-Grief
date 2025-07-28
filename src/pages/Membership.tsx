import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Star, Zap, Shield, ArrowLeft, Check } from 'lucide-react';

export default function Membership() {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Crown className="h-6 w-6" />,
      title: "Premium Content",
      description: "Access to exclusive healing sessions, masterclasses, and resources"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Priority Support",
      description: "Fast-track access to mentors and priority booking for sessions"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Advanced Tools",
      description: "Enhanced progress tracking, personalized insights, and analytics"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Community Access",
      description: "Join exclusive member-only groups and private healing circles"
    }
  ];

  const features = [
    "Unlimited access to healing session library",
    "Weekly one-on-one mentoring sessions",
    "Personalized healing journey roadmap",
    "Early access to new programs and content",
    "Private member community forums",
    "Monthly live Q&A sessions with experts",
    "Downloadable resources and workbooks",
    "Mobile app with offline content",
    "Certificate of completion for programs",
    "24/7 crisis support hotline"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl luxury-heading font-bold mb-6 tracking-tight">
            Premium Membership
          </h1>
          <p className="text-lg luxury-text leading-relaxed max-w-2xl mx-auto">
            Unlock the full potential of your healing journey with exclusive access 
            to premium resources, personalized support, and our complete curriculum.
          </p>
        </div>

        {/* Membership Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/30 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center luxury-heading text-primary">
                  {benefit.icon}
                  <span className="ml-3">{benefit.title}</span>
                </CardTitle>
                <CardDescription className="luxury-text">
                  {benefit.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Membership Pricing */}
        <Card className="bg-gradient-subtle border-primary/30 mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl luxury-heading mb-2">Premium Membership</CardTitle>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-4xl font-bold text-foreground">$97</span>
              <span className="luxury-text">/month</span>
            </div>
            <CardDescription className="luxury-text mt-4">
              Everything you need for complete healing transformation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="luxury-text text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Money Back Guarantee */}
        <Card className="bg-primary/10 border-primary/30 mb-8">
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="text-xl luxury-heading font-semibold mb-2">30-Day Money-Back Guarantee</h3>
            <p className="luxury-text">
              Try our premium membership risk-free. If you're not completely satisfied 
              within 30 days, we'll refund every penny.
            </p>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center space-y-6">
          <Button 
            className="bg-primary hover:bg-secondary text-primary-foreground font-semibold px-12 py-4 text-xl"
            onClick={() => navigate('/subscribe')}
          >
            Start Your Premium Journey
          </Button>
          
          <p className="luxury-text text-sm">
            Cancel anytime • No setup fees • Instant access
          </p>
          
          <div>
            <Button
              variant="link"
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}