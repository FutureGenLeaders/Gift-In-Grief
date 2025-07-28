import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Heart, Compass, Clock, Star, Users } from 'lucide-react';

export default function Mindfulness() {
  const mentoringServices = [
    {
      id: "1-on-1-mentoring",
      title: "1-on-1 Mindfulness Mentoring",
      description: "Personalized guidance tailored to your unique grief journey and healing needs.",
      duration: "60 minutes",
      price: "$150",
      features: [
        "Custom meditation practices",
        "Personalized healing roadmap",
        "24/7 message support between sessions",
        "Progress tracking and adjustments"
      ],
      icon: Brain,
      highlighted: true
    },
    {
      id: "group-sessions",
      title: "Group Mindfulness Circles",
      description: "Connect with others on similar healing journeys in guided group meditation and sharing.",
      duration: "90 minutes",
      price: "$45",
      features: [
        "Guided group meditations",
        "Shared healing experiences",
        "Community support network",
        "Weekly recurring sessions"
      ],
      icon: Users,
      highlighted: false
    },
    {
      id: "intensive-retreat",
      title: "Mindfulness Healing Intensive",
      description: "Deep-dive weekend retreat focusing on mindfulness practices for grief transformation.",
      duration: "3 days",
      price: "$650",
      features: [
        "3-day immersive experience",
        "Multiple meditation techniques",
        "Nature-based healing practices",
        "Take-home practice guide"
      ],
      icon: Compass,
      highlighted: false
    }
  ];

  const mindfulnessPractices = [
    {
      title: "Grief-Aware Breathing",
      description: "Gentle breathing techniques that honor your emotional state while providing calm.",
      duration: "10-15 min"
    },
    {
      title: "Loving-Kindness for Loss",
      description: "Adapted loving-kindness meditation specifically designed for those processing grief.",
      duration: "20-25 min"
    },
    {
      title: "Body Scan for Grief",
      description: "Notice where grief lives in your body and offer compassionate awareness.",
      duration: "15-30 min"
    },
    {
      title: "Memory Meditation",
      description: "Mindfully connect with positive memories while maintaining present-moment awareness.",
      duration: "20-40 min"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl luxury-heading font-bold mb-6">
            Mindfulness Mentoring
          </h1>
          <p className="text-lg luxury-text max-w-2xl mx-auto leading-relaxed">
            Discover the healing power of mindfulness with personalized guidance from experienced mentors 
            who understand the unique landscape of grief and transformation.
          </p>
        </div>

        {/* Mentoring Services */}
        <div className="mb-16">
          <h2 className="text-3xl luxury-heading font-semibold text-center mb-8">
            Mentoring Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mentoringServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={service.id}
                  className={`bg-card border-border hover:bg-muted transition-all duration-300 ${
                    service.highlighted ? 'border-primary shadow-[0_0_30px_hsl(var(--primary)/0.3)]' : ''
                  }`}
                >
                  {service.highlighted && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-2 font-semibold">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="text-primary">
                        <IconComponent className="h-8 w-8" />
                      </div>
                    </div>
                    <CardTitle className="text-xl luxury-heading mb-2">
                      {service.title}
                    </CardTitle>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-foreground">{service.price}</span>
                      <span className="text-muted-foreground">/{service.duration}</span>
                    </div>
                    <CardDescription className="luxury-text text-sm leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Star className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm luxury-text">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      variant={service.highlighted ? "default" : "outline"}
                      className="w-full font-semibold py-3"
                    >
                      Book Session
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Mindfulness Practices */}
        <div className="mb-16">
          <h2 className="text-3xl luxury-heading font-semibold text-center mb-8">
            Guided Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mindfulnessPractices.map((practice, index) => (
              <Card key={index} className="bg-card border-border hover:bg-muted transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg luxury-heading">
                      {practice.title}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{practice.duration}</span>
                    </div>
                  </div>
                  <CardDescription className="luxury-text leading-relaxed">
                    {practice.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Start Practice
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-card border border-border rounded-lg p-8">
          <h3 className="text-2xl luxury-heading font-semibold mb-4">
            Begin Your Mindful Healing Journey
          </h3>
          <p className="luxury-text mb-6 max-w-md mx-auto">
            Connect with experienced mentors who will guide you through personalized mindfulness practices 
            designed specifically for grief healing.
          </p>
          <Button size="lg" className="bg-primary hover:bg-secondary text-primary-foreground font-semibold">
            <Brain className="h-5 w-5 mr-2" />
            Start Mindfulness Mentoring
          </Button>
        </div>
      </div>
    </div>
  );
}