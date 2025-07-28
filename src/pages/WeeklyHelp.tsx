import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Download, Play } from 'lucide-react';

export default function WeeklyHelp() {
  const weeklyContent = [
    {
      week: 1,
      title: "Understanding Your Grief",
      description: "Learn the foundations of grief processing and begin your healing journey with gentle, evidence-based approaches.",
      duration: "45 min",
      status: "available",
      topics: [
        "The nature of grief and loss",
        "Common grief responses", 
        "Creating a safe healing space",
        "Setting healing intentions"
      ]
    },
    {
      week: 2,
      title: "Emotional Awareness & Acceptance",
      description: "Develop skills to recognize, name, and honor your emotions without being overwhelmed by them.",
      duration: "50 min",
      status: "available",
      topics: [
        "Emotional literacy for grief",
        "The wisdom of difficult emotions",
        "Acceptance vs. resistance",
        "Mindful emotional processing"
      ]
    },
    {
      week: 3,
      title: "Building Your Support Network",
      description: "Discover how to identify, nurture, and expand your support system during the healing process.",
      duration: "40 min", 
      status: "locked",
      topics: [
        "Identifying support sources",
        "Communicating your needs",
        "Setting healthy boundaries",
        "Community healing practices"
      ]
    },
    {
      week: 4,
      title: "Self-Care & Resilience",
      description: "Establish sustainable self-care practices that support your healing and build emotional resilience.",
      duration: "55 min",
      status: "locked",
      topics: [
        "Holistic self-care strategies",
        "Building resilience practices",
        "Energy management",
        "Creating healing rituals"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-primary text-primary-foreground";
      case "locked": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl luxury-heading font-bold mb-6">
            Weekly Help Sessions
          </h1>
          <p className="text-lg luxury-text max-w-2xl mx-auto leading-relaxed">
            Structured weekly guidance delivered at your pace. Each session builds upon the previous, 
            creating a comprehensive healing journey designed for lasting transformation.
          </p>
        </div>

        {/* Weekly Content Grid */}
        <div className="space-y-6 mb-16">
          {weeklyContent.map((content) => (
            <Card 
              key={content.week}
              className="bg-card border-border hover:bg-muted transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getStatusColor(content.status)}>
                    Week {content.week}
                  </Badge>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{content.duration}</span>
                  </div>
                </div>
                <CardTitle className="text-2xl luxury-heading mb-2">
                  {content.title}
                </CardTitle>
                <CardDescription className="luxury-text text-base leading-relaxed">
                  {content.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-primary mb-3">Session Topics:</h4>
                  <ul className="space-y-2">
                    {content.topics.map((topic, index) => (
                      <li key={index} className="flex items-start gap-2 luxury-text">
                        <span className="text-primary mt-1">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button 
                    variant={content.status === 'available' ? 'default' : 'secondary'}
                    disabled={content.status === 'locked'}
                    className="flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    {content.status === 'available' ? 'Start Session' : 'Locked'}
                  </Button>
                  {content.status === 'available' && (
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download Resources
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-card border border-border rounded-lg p-8">
          <h3 className="text-2xl luxury-heading font-semibold mb-4">
            Ready to Begin Your Weekly Journey?
          </h3>
          <p className="luxury-text mb-6 max-w-md mx-auto">
            Join our comprehensive program and receive weekly guidance tailored to your healing pace.
          </p>
          <Button size="lg" className="bg-primary hover:bg-secondary text-primary-foreground font-semibold">
            <Calendar className="h-5 w-5 mr-2" />
            Subscribe to Weekly Help
          </Button>
        </div>
      </div>
    </div>
  );
}