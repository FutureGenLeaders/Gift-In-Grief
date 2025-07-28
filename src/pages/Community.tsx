import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageCircle, Heart, Calendar, ArrowLeft } from 'lucide-react';

export default function Community() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-['Playfair_Display'] font-bold text-gold mb-6 tracking-tight">
            Healing Community
          </h1>
          <p className="text-lg font-['Inter'] text-silver leading-relaxed max-w-2xl mx-auto">
            Connect with others on their healing journey. Share experiences, find support, 
            and grow together in a safe, compassionate space.
          </p>
        </div>

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gray-900 border-gray-800 hover:border-gold/30 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center font-['Playfair_Display'] text-gold">
                <Users className="h-5 w-5 mr-3" />
                Support Groups
              </CardTitle>
              <CardDescription className="font-['Inter'] text-silver">
                Join intimate groups focused on specific aspects of grief and healing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 font-['Inter'] text-silver text-sm">
                <li>• Weekly group sessions</li>
                <li>• Peer mentorship programs</li>
                <li>• Specialized loss support</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:border-gold/30 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center font-['Playfair_Display'] text-gold">
                <MessageCircle className="h-5 w-5 mr-3" />
                Discussion Forums
              </CardTitle>
              <CardDescription className="font-['Inter'] text-silver">
                Share thoughts, ask questions, and connect with others 24/7
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 font-['Inter'] text-silver text-sm">
                <li>• Topic-based discussions</li>
                <li>• Anonymous sharing options</li>
                <li>• Moderated safe spaces</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:border-gold/30 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center font-['Playfair_Display'] text-gold">
                <Heart className="h-5 w-5 mr-3" />
                Healing Circles
              </CardTitle>
              <CardDescription className="font-['Inter'] text-silver">
                Regular gatherings for shared healing experiences and growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 font-['Inter'] text-silver text-sm">
                <li>• Guided meditation sessions</li>
                <li>• Storytelling and sharing</li>
                <li>• Ritual and ceremony</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:border-gold/30 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center font-['Playfair_Display'] text-gold">
                <Calendar className="h-5 w-5 mr-3" />
                Community Events
              </CardTitle>
              <CardDescription className="font-['Inter'] text-silver">
                Special events, workshops, and gatherings throughout the year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 font-['Inter'] text-silver text-sm">
                <li>• Monthly virtual gatherings</li>
                <li>• Expert-led workshops</li>
                <li>• Seasonal healing retreats</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Community Guidelines */}
        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="font-['Playfair_Display'] text-gold text-center">Community Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center font-['Inter'] text-silver space-y-3 text-sm">
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
            className="bg-gold text-black hover:bg-silver font-semibold px-8 py-3 text-lg"
            onClick={() => navigate('/sessions')}
          >
            Join Community Sessions
          </Button>
          
          <div>
            <Button
              variant="link"
              onClick={() => navigate('/')}
              className="text-silver hover:text-gold"
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