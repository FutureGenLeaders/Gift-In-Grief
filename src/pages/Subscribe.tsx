
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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* Heading */}
        <h1 className="text-4xl font-['Playfair_Display'] text-[#D4AF37] font-semibold">
          Join Our Healing Community
        </h1>

        {/* Body text */}
        <p className="text-lg font-['Inter'] text-[#C0C0C0] leading-relaxed max-w-md mx-auto">
          Subscribe to receive curated grief-healing resources and mindful practices delivered directly to your inbox.
        </p>

        {/* Subscription Form */}
        <form onSubmit={handleSubscribe} className="space-y-6 mt-12">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-6 py-4 text-lg bg-gray-900 border border-gray-600 rounded-lg 
                       text-white placeholder:text-gray-400
                       focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]
                       transition-all duration-200"
            required
            disabled={loading}
          />
          
          <button
            type="submit"
            disabled={loading || !email}
            className="w-full px-8 py-4 text-lg font-semibold rounded-lg
                       bg-[#D4AF37] text-black
                       hover:bg-[#C0C0C0]
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300 ease-in-out"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {/* Privacy Note */}
        <p className="text-sm text-gray-500">
          We respect your privacy. Unsubscribe anytime.
        </p>

        {/* Return to home */}
        <div className="pt-4">
          <button
            onClick={() => navigate('/')}
            className="text-[#D4AF37] hover:text-[#C0C0C0] transition-colors duration-200"
          >
            ← Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
