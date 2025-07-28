
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function FinalCtaSection() {
  const { user } = useAuth();
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Heart className="h-16 w-16 mx-auto text-yellow-600 mb-8 opacity-90" />
        
        <h2 className="text-4xl md:text-6xl font-light mb-8 bg-gradient-to-r from-yellow-600 via-red-700 to-slate-300 bg-clip-text text-transparent leading-tight">
          Your Healing Journey Begins Now
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
          Take the first step towards transforming your pain into purpose. 
          Your personalized healing assessment takes just 10 minutes and opens the door to profound transformation.
        </p>

        <div className="mb-12">
          <Link 
            to={user ? "/subscribe" : "/assessment"}
            state={!user ? { 
              from: { 
                pathname: "/subscribe", 
                search: "", 
                hash: "", 
                state: null, 
                key: "final-cta-subscribe" 
              } 
            } : undefined}
          >
            <Button size="lg" className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white px-16 py-6 text-xl font-light rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              Begin Your Transformation
              <ArrowRight className="ml-3 h-7 w-7" />
            </Button>
          </Link>
        </div>

        <p className="text-gray-400 text-lg">
          Free assessment • 2-week trial included • No payment required to start
        </p>
      </div>
    </section>
  );
}
