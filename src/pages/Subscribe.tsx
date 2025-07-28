
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Add your subscription API logic here
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Welcome to our community!",
        description: "Thank you for subscribing. Check your email for confirmation.",
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary tracking-tight">
          Join Our Healing Community
        </h1>

        {/* Description */}
        <div className="space-y-4">
          <p className="text-lg sm:text-xl body-text leading-relaxed">
            Subscribe to receive curated grief-healing resources and mindful practices.
          </p>
          <p className="text-base body-text">
            Exclusive content delivered directly to your inbox.
          </p>
        </div>

        {/* Subscription Form */}
        <form onSubmit={handleSubscribe} className="space-y-6 mt-12">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full px-6 py-4 text-lg bg-input border border-border rounded-lg 
                         text-foreground placeholder:text-muted-foreground
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                         transition-all duration-200"
              required
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !email}
            className="w-full px-8 py-4 text-lg font-semibold rounded-lg
                       bg-primary text-primary-foreground
                       hover:bg-secondary hover:text-secondary-foreground
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300 ease-in-out
                       shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {/* Privacy Note */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          We respect your privacy. Unsubscribe anytime with one click.
        </p>

        {/* Return to home */}
        <div className="pt-8">
          <button
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-primary transition-colors duration-200
                       underline underline-offset-4 hover:underline-offset-8"
          >
            ← Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
