import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageCircle, Heart, Calendar, ArrowLeft } from 'lucide-react';

export default function Community() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6 tracking-tight">
            Healing Community
          </h1>
          <p className="text-lg body-text leading-relaxed max-w-2xl mx-auto">
            Connect with others on their healing journey. Share experiences, find support, 
            and grow together in a safe, compassionate space.
          </p>
        </div>

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-card border-border hover:border-primary/30 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Users className="h-5 w-5 mr-3" />
                Support Groups
              </CardTitle>
              <CardDescription className="body-text">
                Join intimate groups focused on specific aspects of grief and healing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 body-text text-sm">
                <li>• Weekly group sessions</li>
                <li>• Peer mentorship programs</li>
                <li>• Specialized loss support</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/30 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <MessageCircle className="h-5 w-5 mr-3" />
                Discussion Forums
              </CardTitle>
              <CardDescription className="body-text">
                Share thoughts, ask questions, and connect with others 24/7
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 body-text text-sm">
                <li>• Topic-based discussions</li>
                <li>• Anonymous sharing options</li>
                <li>• Moderated safe spaces</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/30 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Heart className="h-5 w-5 mr-3" />
                Healing Circles
              </CardTitle>
              <CardDescription className="body-text">
                Regular gatherings for shared healing experiences and growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 body-text text-sm">
                <li>• Guided meditation sessions</li>
                <li>• Storytelling and sharing</li>
                <li>• Ritual and ceremony</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/30 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Calendar className="h-5 w-5 mr-3" />
                Community Events
              </CardTitle>
              <CardDescription className="body-text">
                Special events, workshops, and gatherings throughout the year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 body-text text-sm">
                <li>• Monthly virtual gatherings</li>
                <li>• Expert-led workshops</li>
                <li>• Seasonal healing retreats</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Community Guidelines */}
        <Card className="bg-card/50 border-primary/20 mb-8">
          <CardHeader>
            <CardTitle className="text-primary">Community Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="body-text space-y-3 text-sm">
              <p>Our community is built on compassion, respect, and mutual support.</p>
              <ul className="space-y-1 ml-4">
                <li>• Practice kindness and empathy in all interactions</li>
                <li>• Respect privacy and confidentiality</li>
                <li>• Share your truth while honoring others' experiences</li>
                <li>• Seek help when needed and offer support when able</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center space-y-6">
          <Button 
            className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground px-8 py-3 text-lg font-semibold"
            onClick={() => navigate('/sessions')}
          >
            Join Community Sessions
          </Button>
          
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